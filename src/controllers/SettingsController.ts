import BaseController from './BaseController';
import SettingsView from '../view/SettingsView/SettingsView';
import eventBus from '../utils/eventBus';
import Routes from '../consts/routes';
import Events from '../consts/events';
import { validateForm, checkForm, processingResultForms, fillForm, IFormList } from '../utils/form';
import ScreenSpinnerClass from '../utils/ScreenSpinner';
import userModel from '../models/UserModel';
import feedModel from '../models/FeedModel';
import chatModel from '../models/ChatModel';
import BaseView from '../view/BaseView';
import Context from '../utils/Context';
import webSocketListener from '../utils/WebSocketListener';
import FormItem from '../components/FormItem/FormItem';
import { onPhotoUpload } from '../utils/photo';

/**
 * @class
 * Контроллер логина
 */
class SettingsController extends BaseController {
    formSuccess = false;
    file: string = null;
    settingsList: IFormList = {
        name: {
            id: 'name',
            formItemId: 'name_form-item',
            required: true
        },
        mail: {
            id: 'email',
            formItemId: 'email_form-item',
            required: true
        },
        description: {
            id: 'settings_description',
            formItemId: 'settings_description_form-item'
        },
        city: {
            id: 'settings_city',
            formItemId: 'settings_city_form-item'
        },
        instagram: {
            id: 'settings_instagram',
            formItemId: 'settings_instagram_form-item'
        },
        sex: {
            id: 'settings_sex',
            formItemId: 'settings_sex_form-item',
            required: true
        },
        datePreference: {
            id: 'settings__datePreference',
            formItemId: 'settings__datePreference_form-item',
            required: true
        },
        passwordOld: {
            id: 'settings_password_old',
            formItemId: 'settings_password_old_form-item',
            required: true
        },
        password: {
            id: 'settings_password_new',
            formItemId: 'settings_password_new_form-item'
        },
        passwordRepeat: {
            id: 'settings_password_new_repeat',
            formItemId: 'settings_password_new_repeat_form-item',
            required: true
        },
        birthday: {
            id: 'settings_birthday',
            formItemId: 'settings_birthday_from-item',
            required: true
        }
    };

    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {SettingsController}
     */
    constructor(view: BaseView) {
        super({ view: view || new SettingsView() });
    }

    finish(): void {
        this.deleteListeners();
        eventBus.disconnect(Events.formSubmitted, this.onSubmit);
    }

    onLogOut(): void {
        userModel.logout().then(() => {
            feedModel.resetFeed();
            chatModel.resetChats();
            webSocketListener.stop();
            eventBus.emit(Events.updateAvatar);
            eventBus.emit(Events.routeChange, Routes.loginRoute);
        });
    }

    /**
     * Запускает контроллер
     * @param {Context} queryParams
     */
    start(queryParams: Context): void {
        this.queryParams = queryParams;
        super
            .auth()
            .then(() => {
                this.view.show();
                validateForm.call(this, this.settingsList);
                this.formSubmit();
                this.fillFormData();
            })
            .catch((e) => {
                console.error(e);
            });
    }

    /**
     * Заполняет поля формы данными пользователя
     */
    fillFormData(): void {
        const json = userModel.getFilledData();
        if (json.error) {
            eventBus.emit(Events.formError);
        } else {
            document.querySelectorAll(':disabled').forEach((item) => {
                (<HTMLInputElement>item).disabled = false;
            });

            document.querySelectorAll('.placeholder-item').forEach((item) => {
                item.classList.remove('placeholder-item');
            });

            fillForm(json, this.settingsList);
        }
    }

    /**
     * Подписывается на заполнение формы
     */
    formSubmit(): void {
        this.registerListener({
            element: document.getElementById('settings__form-submit'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('settings__form'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('settings__pass'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('input_avatar'),
            type: 'change',
            listener: (e) => {
                onPhotoUpload.call(this, e);
            }
        });

        this.registerListener({
            element: document.getElementById('logout'),
            type: 'click',
            listener: this.onLogOut.bind(this)
        });

        this.registerListener({
            element: document.getElementById('input_avatar__button'),
            type: 'click',
            listener: () => {
                document.getElementById('input_avatar').click();
            }
        });
    }

    collapsePhoto(): void {
        const photoForm = document.getElementById('settings__new-photo');
        const tmpDiv = document.createElement('div');
        tmpDiv.innerHTML = new FormItem({ id: 'settings__new-photo' }).render();
        photoForm.replaceWith(tmpDiv.firstChild);
    }

    /**
     * Валидирует поля и делает запрос на сервер
     */
    onSubmit(): void {
        this.formSuccess = checkForm.call(this, this.settingsList);
        const tmpForm: Context = {};
        Object.entries(this.settingsList).forEach((item) => {
            const [key, obj] = item;
            if ((obj.value && obj.valid) || !obj.required) {
                tmpForm[key] = obj.value;
            }
        });

        if (this.formSuccess) {
            if (this.file !== null) {
                tmpForm.photos = this.file;
                userModel
                    .uploadPhoto(this.file)
                    .then((photoResponse) => {
                        if (!photoResponse.ok) {
                            return;
                        }
                        eventBus.emit(Events.updateAvatar);
                        this.collapsePhoto();
                    })
                    .catch((photoReason) => {
                        console.error('Photo upload error - ', photoReason);
                    });
            }

            const popout = new ScreenSpinnerClass();

            userModel
                .update(tmpForm)
                .finally(() => {
                    popout.destroy();
                })
                .then((response) => {
                    const json = response.json;
                    eventBus.emit(Events.pushNotifications, { children: 'Сохранено' });
                    processingResultForms({
                        data: json || {},
                        errorBlockId: 'settings-error',
                        formList: this.settingsList
                    });
                })
                .catch((reason) => {
                    console.error(reason);
                    eventBus.emit(Events.pushNotifications, {
                        status: 'error',
                        children: 'Что-то не то с интернетом('
                    });
                });
        }
    }
}

export default SettingsController;

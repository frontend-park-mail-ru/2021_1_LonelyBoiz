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
import { onPhotoUpload, setPhoto } from '../utils/photo';
import DragableListClass from '../utils/DragableList';
import Img from '../components/Img/Img';
import { arrayMove, badInternet } from '../utils/helpers';

type TSettingsList = 'main' | 'photo' | 'password';

type ISettingsGropus = {
    [key in TSettingsList]: IFormList;
};

type ISettingsGropusIds = {
    [key in TSettingsList]: string[];
};

type ISettingsListIds = {
    [key in TSettingsList]: string;
};

/**
 * @class
 * Контроллер логина
 */
class SettingsController extends BaseController {
    formSuccess = false;
    file: File = null;
    dragMainPhoto: DragableListClass = null;
    dragSecretPhoto: DragableListClass = null;
    settingsGroupIds: ISettingsGropusIds = {
        main: ['settings__main'],
        photo: ['settings__photo'],
        password: ['settings__password']
    };

    settingsListIds: ISettingsListIds = {
        main: 'settings-list__main',
        photo: 'settings-list__photo',
        password: 'settings-list__password'
    };

    settingsGroup: ISettingsGropus = {
        main: {
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
            birthday: {
                id: 'settings_birthday',
                formItemId: 'settings_birthday_from-item',
                required: true
            }
        },
        photo: {},
        password: {
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
            }
        }
    };

    settingsList: IFormList = {};

    photoList: string[] = [];
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {SettingsController}
     */
    constructor(view?: BaseView) {
        super({ view: view || new SettingsView() });
    }

    finish(): void {
        this.deleteListeners();
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
                this.changeList('main');
                if (window.innerWidth < 700) {
                    this.setVisibleSettings(false);
                }
                Object.entries(this.settingsGroup).forEach(([, value]) => {
                    validateForm.call(this, value);
                });
                this.formSubmit();
                this.fillFormData();
                this.showDragPhoto();
                document.getElementById('input_avatar__save-button').classList.add('div_disabled');
            })
            .catch((e) => {
                console.error(e);
            });
    }

    showDragPhoto(): void {
        const root = document.getElementById('drag-photo');

        if (this.dragMainPhoto) {
            this.dragMainPhoto.deleteListeners();
        }

        this.dragMainPhoto = new DragableListClass(
            root,
            this.photoList.map((item) => {
                return new Img({
                    src: item
                }).render();
            }),
            (from: number, to: number) => {
                arrayMove(this.photoList, from, to);
                // ИСПРАВИТЬ saveNewArray
            }
        );
    }

    /**
     * Заполняет поля формы данными пользователя
     */
    fillFormData(): void {
        const json = userModel.getFilledData();
        this.photoList = json.photos;
        if (json.error) {
            return;
        }
        document.querySelectorAll(':disabled').forEach((item) => {
            (<HTMLInputElement>item).disabled = false;
        });

        document.querySelectorAll('.placeholder-item').forEach((item) => {
            item.classList.remove('placeholder-item');
        });

        fillForm(json, this.settingsGroup.main);
    }

    /**
     * Подписывается на заполнение формы
     */
    formSubmit(): void {
        this.registerListener({
            element: document.getElementById('settings__submit'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('settings__main'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('settings__password'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('logout'),
            type: 'click',
            listener: this.onLogOut.bind(this)
        });

        this.registerListener({
            element: document.getElementById('input_avatar'),
            type: 'change',
            listener: (e) => {
                this.photoUpload(e);
            }
        });

        this.registerListener({
            element: document.getElementById('input_avatar__button'),
            type: 'click',
            listener: () => {
                document.getElementById('input_avatar').click();
            }
        });

        this.registerListener({
            element: document.getElementById('settings__chevronBack'),
            type: 'click',
            listener: () => {
                this.setVisibleSettings(false);
            }
        });

        this.registerListener({
            element: document.getElementById('input_avatar__save-button'),
            type: 'click',
            listener: () => {
                this.uploadPhoto(this.file);
            }
        });

        Object.entries(this.settingsListIds).forEach(([key, value]) => {
            this.registerListener({
                element: document.getElementById(value),
                type: 'click',
                listener: () => {
                    this.changeList(<keyof ISettingsListIds>key);
                }
            });
        });
    }

    photoUpload(e: Event): void {
        onPhotoUpload(e).then((file) => {
            document.getElementById('input_avatar__save-button').classList.remove('div_disabled');
            setPhoto(file, 'settings__new-photo', 'settings__photo');
            this.file = file;
        });
    }

    uploadPhoto(file: Context): void {
        file = file ?? this.file;
        if (file !== null) {
            userModel
                .uploadPhoto(file)
                .then((photoResponse) => {
                    if (!photoResponse.ok) {
                        return;
                    }
                    this.showDragPhoto();
                    eventBus.emit(Events.updateAvatar);
                    document.getElementById('input_avatar__save-button').classList.add('div_disabled');
                    this.file = null;
                    this.collapsePhoto();
                })
                .catch((photoReason) => {
                    console.error('Photo upload error - ', photoReason);
                });
        }
    }

    setVisibleSettings(visibleSettings: boolean): void {
        const settingsList = document.querySelector('.settings__list');
        const settings = document.querySelector('.settings');

        settingsList.classList.add(`div-phone_${visibleSettings ? 'disabled' : 'active'}`);
        settingsList.classList.remove(`div-phone_${visibleSettings ? 'active' : 'disabled'}`);

        settings.classList.remove(`div-phone_${visibleSettings ? 'disabled' : 'active'}`);
        settings.classList.add(`div-phone_${visibleSettings ? 'active' : 'disabled'}`);

        if (!visibleSettings) {
            Object.entries(this.settingsListIds).forEach(([, value]) => {
                document.getElementById(value).classList.remove('cell_active');
            });
        }
    }

    changeList(newKey: keyof ISettingsListIds): void {
        Object.entries(this.settingsListIds).forEach(([key, value]) => {
            document.getElementById(value).classList.remove('cell_active');
            if (key === newKey) {
                document.getElementById(value).classList.add('cell_active');
            }
        });
        this.settingsList = this.settingsGroup[newKey];

        Object.entries(this.settingsGroupIds).forEach(([key, value]) => {
            value.forEach((item) => {
                const currentElement = document.getElementById(item).parentElement.parentElement;
                if (key === newKey) {
                    currentElement.classList.remove('div_disabled');
                } else {
                    currentElement.classList.add('div_disabled');
                }
            });
        });

        this.setVisibleSettings(true);
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
                    badInternet();
                });
        }
    }
}

export default SettingsController;

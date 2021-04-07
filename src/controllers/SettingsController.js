import BaseController from './BaseController.js';
import SettingsView from '../view/SettingsView/SettingsView.js';
import eventBus from '../utils/eventBus.js';
import Routes from '../consts/routes.js';
import Events from '../consts/events.js';
import {
    validateForm,
    checkForm,
    processingResultForms,
    fillForm
} from '../utils/form.js';
import ScreenSpinnerClass from '../utils/ScreenSpinner.js';
import { IconsSrc } from '../consts/icons.js';
import IconClass from '../components/Icon/Icon.js';
import userModel from '../models/UserModel.js';

/**
 * @class
 * Контроллер логина
 */
class SettingsController extends BaseController {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {SettingsController}
     */
    constructor() {
        super(new SettingsView());
        this.file = null;
        this.toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });

        this.formSuccess = false;
        this.settingsList = {
            name: {
                id: 'settings_name',
                formItemId: 'settings_name_form-item',
                required: true
            },
            mail: {
                id: 'settings_mail',
                formItemId: 'settings_mail_form-item',
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
                id: 'settings_datePreference',
                formItemId: 'settings_datePreference_form-item',
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
    }

    finish() {
        this.deleteListeners();
        eventBus.disconnect(Events.formSubmitted, this.onSubmit);
    }

    onLogOut() {
        userModel.logout().then(_ => {
            window.localStorage.removeItem('u-id');
            window.localStorage.setItem('u-avatar', 'img/img.png');
            eventBus.emit(Events.routeChange, Routes.loginRoute);
        });
    }

    /**
     * Запускает контроллер
     */
    start() {
        userModel.auth()
            .then(response => {
                if (!response.ok) {
                    eventBus.emit(Events.routeChange, Routes.loginRoute);
                }
                this.view.show();
                validateForm.call(this, this.settingsList);
                this.formSubmit();

                this.registerListener({
                    element: document.getElementById('input_avatar'),
                    type: 'change',
                    listener: this.onFileUpload.bind(this)
                });

                this.registerListener({
                    element: document.getElementById('logout'),
                    type: 'click',
                    listener: this.onLogOut.bind(this)
                });

                this.registerListener({
                    element: document.getElementById('input_avatar__button'),
                    type: 'click',
                    listener: (e) => {
                        document.getElementById('input_avatar').click();
                    }
                });

                this.fillFormData();
            })
            .catch(reason => {
                eventBus.emit(Events.routeChange, Routes.loginRoute);
                console.error('Auth - error: ', reason);
            });
    }

    /**
     * Заполняет поля формы данными пользователя
     */
    fillFormData() {
        const json = userModel.getFilledData();
        if (json.error) {
            eventBus.emit(Events.formError);
        } else {
            document.querySelectorAll(':disabled').forEach((item) => {
                item.disabled = false;
            });

            document
                .querySelectorAll('.placeholder-item')
                .forEach((item) => {
                    item.classList.remove('placeholder-item');
                });

            fillForm(json, this.settingsList);
        }
    }

    /**
     * Подписывается на заполнение формы
     */
    formSubmit() {
        this.registerListener({
            element: document.getElementById('settings__form-submit'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit(e);
            }
        });

        this.registerListener({
            element: document.getElementById('settings__form'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit(e);
            }
        });

        this.registerListener({
            element: document.getElementById('settings__pass'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit(e);
            }
        });
    }

    onFileUpload(e) {
        this.toBase64(e.currentTarget.files[0])
            .then((data) => {
                this.file = data;

                const img = document.createElement('img');
                img.src = data;
                img.id = 'settings__new-photo';
                img.classList += 'settings__photo';

                const photoForm = document.getElementById(
                    'settings__new-photo'
                );
                photoForm.replaceWith(img);
            })
            .catch((e) => console.error(e));
    }

    /**
     * Валидирует поля и делает запрос на сервер
     */
    onSubmit(e) {
        this.formSuccess = checkForm.call(this, this.settingsList);
        const tmpForm = {};
        Object.entries(this.settingsList).forEach((item) => {
            const [key, obj] = item;
            if ((obj.value && obj.valid) || !obj.required) {
                tmpForm[key] = obj.value;
            }
        });

        if (this.formSuccess) {
            if (this.file !== null) {
                tmpForm.avatar = this.file;
            }

            const popout = new ScreenSpinnerClass({});

            userModel.update(tmpForm)
                .finally(() => {
                    popout.destroy();
                })
                .then((response) => {
                    const json = response.json;
                    processingResultForms({
                        data: json || {},
                        errorBlockId: 'settings-error',
                        formList: this.settingsList
                    }).then((json) => {
                        if (this.file !== null) {
                            window.localStorage.setItem('u-avatar', this.file);
                            document.querySelector(
                                '.u-avatar-header'
                            ).src = this.file;
                        }
                    });
                })
                .catch((reason) => {
                    console.error(reason);
                    eventBus.emit(Events.pushNotifications, {
                        before: new IconClass({
                            iconCode: IconsSrc.error_circle,
                            iconClasses: 'error-icon'
                        }).render(),
                        children: 'Что-то не то с интернетом('
                    });
                });
        }
    }
}

export default SettingsController;

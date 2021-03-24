import BaseController from './BaseController.js';
import SettingsView from '../view/SettingsView/SettingsView.js';
import eventBus from '../utils/eventBus.js';
import { setDateById } from '../utils/dateUtil.js';
import Routes from '../consts/routes.js';
import Events from '../consts/events.js';
import { sexEnum, datePreferenceEnum } from '../consts/sexEnum.js';
import {
    validateFormMail,
    validateFormPassword,
    validateFormName,
    validateFormBirthday,
    validateFormPasswordRepeat,
    validateFormSex,
    validateFormDatePreference,
    validateFormPasswordOld
} from '../utils/validationForm.js';
import { getCurentUsersData, setCurentUsersData } from '../models/UserModel.js';

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

        this.settingsList = {
            name: {
                id: 'settings_name',
                formItemId: 'settings_name_form-item',
                validFunc: validateFormName
            },
            mail: {
                id: 'settings_mail',
                formItemId: 'settings_mail_form-item',
                validFunc: validateFormMail
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
                validFunc: validateFormSex
            },
            datePreference: {
                id: 'settings_datePreference',
                formItemId: 'settings_datePreference_form-item',
                validFunc: validateFormDatePreference
            },
            passwordOld: {
                id: 'settings_password_old',
                formItemId: 'settings_password_old_form-item',
                validFunc: validateFormPasswordOld
            },
            password: {
                id: 'settings_password_new',
                formItemId: 'settings_password_new_form-item',
                validFunc: validateFormPassword
            },
            passwordRepeat: {
                id: 'settings_password_new_repeat',
                formItemId: 'settings_password_new_repeat_form-item',
                validFunc: validateFormPasswordRepeat
            },
            birthday: {
                id: 'settings_birthday',
                formItemId: 'settings_birthday_from-item',
                validFunc: validateFormBirthday
            }
        };
    }

    finish() {
        this.deleteListeners();
        eventBus.disconnect(Events.formSubmitted, this.onSubmit);
    }

    onLogOut() {
        window.localStorage.removeItem('u-id');
        window.localStorage.setItem('u-avatar', 'img/img.png');
        eventBus.emit(Events.routeChange, Routes.loginRoute);
    }

    /**
     * Запускает контроллер
     */
    start() {
        this.view.show();

        this.registerInputListener();

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

        getCurentUsersData()
            .then((json) => {
                if (json.error) {
                    eventBus.emit(Events.formError);
                } else {
                    Object.entries(json).forEach((item, i) => {
                        const [key, value] = item;
                        switch (key) {
                        case 'sex':
                            document.getElementById(
                                this.settingsList[key].id
                            ).value = sexEnum[value];
                            break;
                        case 'datePreference':
                            document.getElementById(
                                this.settingsList[key].id
                            ).value = datePreferenceEnum[value];
                            break;
                        case 'birthday':
                            setDateById(
                                this.settingsList[key].id,
                                new Date(value)
                            );
                            break;

                        default:
                            if (this.settingsList[key]) {
                                document.getElementById(
                                    this.settingsList[key].id
                                ).value = value;
                            }
                            break;
                        }
                    });
                }
            })
            .catch((reason) => {
                console.error('getCurentUsersData - error: ', reason);
            });

        this.registerListener({
            element: document.getElementById('input_avatar__button'),
            type: 'click',
            listener: (e) => {
                document.getElementById('input_avatar').click();
            }
        });

        this.registerListener({
            element: document.getElementById('settings__form'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit(e);
            }
        });
    }

    registerInputListener() {
        Object.entries(this.settingsList).forEach((item, i) => {
            const [key, obj] = item;
            if (obj.validFunc && obj.validFunc !== null) {
                this.registerListener({
                    element: document.getElementById(obj.id),
                    type: 'change',
                    listener: (e) => {
                        switch (key) {
                        case 'passwordRepeat':
                        case 'passwordOld':
                            obj.validFunc(
                                obj.id,
                                this.settingsList.password.id,
                                obj.formItemId
                            );
                            break;

                        default:
                            obj.validFunc(obj.id, obj.formItemId);
                            break;
                        }
                    }
                });
            }
        });
    }

    onFileUpload(e) {
        this.toBase64(e.currentTarget.files[0])
            .then((data) => {
                this.file = data;

                const img = new Image();
                img.src = data;
                img.classList += 'settings__photo';

                const photoForm = document.getElementById('settings__photo');
                photoForm.appendChild(img);
            })
            .catch((e) => console.error(e));
    }

    /**
     * Валидирует поля и делает запрос на сервер
     */
    onSubmit(e) {
        let success = true;
        const tmpForm = {};

        Object.entries(this.settingsList).forEach((item, i) => {
            const [key, obj] = item;
            if (obj.validFunc && obj.validFunc !== null) {
                let validResult = {};
                switch (key) {
                case 'passwordRepeat':
                case 'passwordOld':
                    validResult = obj.validFunc(
                        obj.id,
                        this.settingsList.password.id,
                        obj.formItemId
                    );
                    break;

                default:
                    validResult = obj.validFunc(obj.id, obj.formItemId);
                    break;
                }
                if (!validResult.valid) {
                    success = false;
                } else {
                    if (validResult.value && validResult.value !== null) {
                        if (key === 'birthday') {
                            tmpForm[key] = validResult.value.getTime();
                        } else {
                            tmpForm[key] = validResult.value;
                        }
                    }
                }
            } else {
                tmpForm[key] = document.getElementById(obj.id).value;
            }
        });

        if (success) {
            if (this.file !== null) {
                tmpForm.avatar = this.file;
            }

            setCurentUsersData(tmpForm)
                .then((json) => {
                    console.log('Success', json);

                    if (this.file !== null) {
                        window.localStorage.setItem('u-avatar', this.file);
                        document.querySelector(
                            '.u-avatar-header'
                        ).src = this.file;
                    }
                })
                .catch((reason) => {
                    console.error(reason);
                });
        }
    }
}

export default SettingsController;

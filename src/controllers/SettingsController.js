import BaseController from './BaseController.js';
import SettingsView from '../view/SettingsView/SettingsView.js';
import eventBus from '../utils/eventBus.js';
import Routes from '../consts/routes.js';
import Events from '../consts/events.js';
import ValidationsErrors from '../consts/validationsErrors.js';
import {
    validateMail,
    validatePassword,
    validateName,
    validateBirthday,
    validatePasswordRepeat
} from '../utils/validation.js';
import { formItemSetParams } from '../utils/formItem.js';
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
        this.file = null
        this.toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    finish() {
        this.deleteListeners();
        eventBus.disconnect(Events.formSubmitted, this.onSubmit);
    }

    onLogOut() {
        window.localStorage.removeItem('u-id');
        window.localStorage.setItem('u-avatar', 'img/img.png');
        eventBus.emit(Events.routeChange, Routes.loginRoute)
    }

    /**
     * Запускает контроллер
     */
    start() {
        this.view.show();

        this.registerListener({
            element: document.getElementById('input_avatar'),
            type: 'change',
            listener: this.onFileUpload.bind(this)
        })

        this.registerListener({
            element: document.getElementById('logout'),
            type: 'click',
            listener: this.onLogOut.bind(this)
        })


        getCurentUsersData()
            .then((json) => {
                if (json.error) {
                    eventBus.emit(Events.formError);
                } else {
                    const date = new Date(json.birthday);
                    document.getElementById('settings_name').value = json.name;
                    document.getElementById('settings_mail').value = json.mail;
                    document.getElementById('settings_city').value = json.city;
                    document.getElementById('settings_description').value = json.description;
                    document.getElementById('settings_instagram').value =
                        json.instagram;
                    document.getElementById('settings_sex').value =
                        json.sex === 'female' ? 1 : 0;
                    document.getElementById('settings_datePreference').value =
                        json.datePreference === 'female'
                            ? 1
                            : json.datePreference === 'male'
                                ? 0
                                : 2;
                    document.getElementById(
                        'settings_months'
                    ).value = date.getMonth();
                    document.getElementById('settings_days').value =
                        date.getDate() - 1;
                    document.getElementById('settings_years').value =
                        new Date().getFullYear() - 18 - date.getFullYear();
                }
            })
            .catch((reason) => {
                console.error('getCurentUsersData - error: ', reason);
            });

        eventBus.connect(Events.formSubmitted, this.onSubmit);
        this.registerListener({
            element: document.getElementById('input_avatar__button'),
            type: 'click',
            listener: (e) => {
                document.getElementById('input_avatar').click();
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
    }

    onFileUpload(e) {
        this.toBase64(e.currentTarget.files[0])
            .then((data) => {
                this.file = data
                window.localStorage.setItem('u-avatar', data);
                document.querySelector('.u-avatar-header').src = data
            })
            .catch((e) => console.error(e));
    }

    /**
     * Валидирует поля и делает запрос на сервер
     */
    onSubmit(e) {
        const name = document.getElementById('settings_name');
        const nameFormItem = document.getElementById('settings_name_form-item');
        const mail = document.getElementById('settings_mail');
        const mailFormItem = document.getElementById('settings_mail_form-item');
        const description = document.getElementById('settings_description');
        const descriptionFormItem = document.getElementById(
            'settings_description_form-item'
        );
        const city = document.getElementById('settings_city');
        const cityFormItem = document.getElementById('settings_city_form-item');
        const instagram = document.getElementById('settings_instagram');
        const instagramFormItem = document.getElementById(
            'settings_instagram_form-item'
        );
        const sex = document.getElementById('settings_sex');
        const datePreference = document.getElementById(
            'settings_datePreference'
        );
        const passwordOld = document.getElementById('settings_password_old');
        const password = document.getElementById('settings_password_new');
        const passwordFormItem = document.getElementById(
            'settings_password_new_form-item'
        );
        const passwordRepeat = document.getElementById(
            'settings_password_new_repeat'
        );
        const passwordRepeatFormItem = document.getElementById(
            'settings_password_new_repeat_form-item'
        );
        const settingsBirthdayFormItem = document.getElementById(
            'settings_birthday_from-item'
        );
        const monthsSelect = document.getElementById('settings_months');
        const daysSelect = document.getElementById('settings_days');
        const yearsSelect = document.getElementById('settings_years');
        const date = new Date(
            yearsSelect.options[yearsSelect.selectedIndex].label,
            monthsSelect.value,
            parseInt(daysSelect.value) + 1
        );

        let success = true;

        if (!validateMail(mail.value)) {
            success = false;
            formItemSetParams({
                element: mailFormItem,
                newStatus: 'error',
                newBottom: ValidationsErrors.mail
            });
        } else {
            formItemSetParams({
                element: mailFormItem,
                newStatus: 'valid',
                newBottom: ''
            });
        }

        if (!validateName(name.value)) {
            success = false;
            formItemSetParams({
                element: nameFormItem,
                newStatus: 'error',
                newBottom: ValidationsErrors.name
            });
        } else {
            formItemSetParams({
                element: nameFormItem,
                newStatus: 'valid',
                newBottom: ''
            });
        }

        formItemSetParams({
            element: descriptionFormItem,
            newStatus: 'valid'
        });

        formItemSetParams({
            element: cityFormItem,
            newStatus: 'valid'
        });

        formItemSetParams({
            element: instagramFormItem,
            newStatus: 'valid'
        });

        if (password.value.length > 0 && !validatePassword(password.value)) {
            success = false;
            formItemSetParams({
                element: passwordFormItem,
                newStatus: 'error',
                newBottom: ValidationsErrors.password
            });
        } else {
            formItemSetParams({
                element: passwordFormItem,
                newStatus: 'valid',
                newBottom: ''
            });
        }

        if (
            password.value.length > 0 &&
            !validatePasswordRepeat(password.value, passwordRepeat.value)
        ) {
            success = false;
            formItemSetParams({
                element: passwordRepeatFormItem,
                newStatus: 'error',
                newBottom: ValidationsErrors.passwordRepeat
            });
        } else {
            formItemSetParams({
                element: passwordRepeatFormItem,
                newStatus: 'valid',
                newBottom: ''
            });
        }

        if (!validateBirthday(date)) {
            success = false;
            formItemSetParams({
                element: settingsBirthdayFormItem,
                newStatus: 'error',
                newBottom: ValidationsErrors.birthday
            });
        } else {
            formItemSetParams({
                element: settingsBirthdayFormItem,
                newStatus: 'valid',
                newBottom: ''
            });
        }

        if (success) {
            let tmpForm = {
                name: name.value,
                mail: mail.value,
                description: description.value,
                city: city.value,
                instagram: instagram.value,
                sex: parseInt(sex.value) === 0 ? 'male' : 'female',
                datePreference:
                    parseInt(datePreference.value) === 0
                        ? 'male'
                        : parseInt(datePreference.value) === 1
                        ? 'female'
                        : 'both',
                passwordOld: passwordOld.value,
                password: password.value,
                passwordRepeat: passwordRepeat.value,
                birthday: date.getTime() / 1000
            };
            if (this.file !== null) {
                tmpForm.avatar = this.file;
            }

            setCurentUsersData(tmpForm)
                .then((json) => {
                    console.log('Success', json);
                })
                .catch((reason) => {
                    console.error(reason);
                });
        }
    }
}

export default SettingsController;

import BaseController from './BaseController.js';
import SettingsView from '../view/SettingsView/SettingsView.js';
import eventBus from '../utils/eventBus.js';
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

import Input from '../components/Input/Input.js';
import FormList from '../components/FormList/FormList.js';
import Select from '../components/Select/Select.js';
import Button from '../components/Button/Button.js';
import DateInput from '../components/DateInput/DateInput.js';
import Header from '../components/Header/Header.js';
import FormItem from '../components/FormItem/FormItem.js';

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

        eventBus.connect(Events.formSubmitted, this.onSubmit);
        this.registerListener({
            element: document.getElementById('input_avatar__button'),
            type: 'click',
            listener: (e) => {
                // e.preventDefault();
                document.getElementById('input_avatar').click();
                onSubmit(e);
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
        const sexFormItem = document.getElementById('settings_sex_form-item');
        const datePreference = document.getElementById(
            'settings_datePreference'
        );
        const datePreferenceFormItem = document.getElementById(
            'settings_datePreference_form-item'
        );
        const passwordOld = document.getElementById('settings_password_old');
        const passwordOldFormItem = document.getElementById(
            'settings_password_old_form-item'
        );
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
        console.log(date)

        if (!validateMail(mail.value)) {
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
            console.log(nameFormItem)
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

        if (!validatePassword(password.value)) {
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

        if (!validatePasswordRepeat(password.value, passwordRepeat.value)){
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

        if (!validateBirthday(date)){
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
    }
}

export default SettingsController;

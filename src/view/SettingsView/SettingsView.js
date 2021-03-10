import Input from '../../components/Input/Input.js';
import FormList from '../../components/FormList/FormList.js';
import Select from '../../components/Select/Select.js';
import Button from '../../components/Button/Button.js';
import DateInput from '../../components/DateInput/DateInput.js';
import Header from '../../components/Header/Header.js';
import FormItem from '../../components/FormItem/FormItem.js';

const settingsTemplate = 'SettingsView.hbs';

/**
 * @class
 * Страница логина
 */
class Settings {
    /**
     * Создает экземпляр Settings
     *
     * @constructor
     * @this  {Settings}
     * @param {Object} context
     */
    constructor(context) {
        this.template = Handlebars.templates[settingsTemplate];
        this.root = document.getElementById('app');
        this.context = context || {};
    }

    /**
     * Отображает страницу
     */
    show() {
        this.context.Header = new Header().render();

        this.context.Settings = new FormList({
            id: 'settings__form',
            formList: [
                {
                    children: new Button({
                        type: 'button',
                        id: 'input_avatar__button',
                        mode: 'secondary',
                        text: new Input({
                            id: 'input_avatar',
                            type: 'file',
                            placeholder: 'Обновить аватарку',
                            accept: '.jpg,.jpeg,.png'
                        }).render()
                    }).render()
                },
                {
                    top: 'Имя',
                    id: 'settings_name_form-item',
                    children: new Input({
                        id: 'settings_name',
                        placeholder: 'Имя'
                    }).render()
                },
                {
                    top: 'Дата рождения',
                    id: 'settings_birthday_from-item',
                    children: new DateInput({
                        monthsId: 'settings_months',
                        daysId: 'settings_days',
                        yearsId: 'settings_years'
                    }).render()
                },
                {
                    top: 'Почта',
                    id: 'settings_mail_form-item',
                    children: new Input({
                        type: 'mail',
                        id: 'settings_mail',
                        placeholder: 'Почта'
                    }).render()
                },
                {
                    top: 'Описание профиля',
                    id: 'settings_description_form-item',
                    children: new Input({
                        id: 'settings_description',
                        placeholder: 'Описание'
                    }).render()
                },
                {
                    top: 'Город',
                    id: 'settings_city_form-item',
                    children: new Input({
                        id: 'settings_city',
                        placeholder: 'Город'
                    }).render()
                },
                {
                    top: 'Instagram',
                    id: 'settings_instagram_form-item',
                    children: new Input({
                        id: 'settings_instagram',
                        placeholder: 'Instagram'
                    }).render()
                },
                {
                    top: 'Пол',
                    id: 'settings_sex_form-item',
                    children: new Select({
                        id: 'settings_sex',
                        title: 'Пол',
                        options: ['Мужской', 'Женский']
                    }).render()
                },
                {
                    top: 'Пол соискателя',
                    id: 'settings_datePreference_form-item',
                    children: new Select({
                        id: 'settings_datePreference',
                        title: 'Пол соискателя',
                        options: ['Мужской', 'Женский', 'Оба']
                    }).render()
                },
                {
                    top: 'Старый Пароль',
                    id: 'settings_password_old_form-item',
                    children: new Input({
                        type: 'password',
                        id: 'settings_password_old',
                        placeholder: 'Старый Пароль'
                    }).render()
                },
                {
                    top: 'Новый пароль',
                    id: 'settings_password_new_form-item',
                    children: new Input({
                        type: 'password',
                        id: 'settings_password_new',
                        placeholder: 'Новый пароль'
                    }).render()
                },
                {
                    top: 'Новый нароль еще раз',
                    id: 'settings_password_new_repeat_form-item',
                    children: new Input({
                        type: 'password',
                        id: 'settings_password_new_repeat',
                        placeholder: 'Новый нароль еще раз'
                    }).render()
                },
                {
                    children: new Button({
                        id: 'settings_submit',
                        type: 'submit',
                        text: 'Сохранить'
                    }).render()
                }
            ]
        }).render();

        this.context.Logout = new FormItem({
            children: new Button({
                mode: 'destructive',
                id: 'logout',
                type: 'button',
                text: 'Выйти'
            }).render()
        }).render();

        this.root.innerHTML = this.template(this.context);
    }
}

export default Settings;

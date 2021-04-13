import Input from '../../components/Input/Input';
import FormList from '../../components/FormList/FormList';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import DateInput from '../../components/DateInput/DateInput';
import FormItem from '../../components/FormItem/FormItem';
import validationsErrors from '../../consts/validationsErrors';
import BaseView from '../BaseView';
import Views from '../../consts/views';
import template from './SettingsView.hbs';
import Context from '../../utils/Context';
import './SettingsView.css';

/**
 * @class
 * Страница настроек
 */
class SettingsView extends BaseView {
    /**
     * Создает экземпляр Settings
     *
     * @constructor
     * @this  {SettingsView}
     * @param {Context} context
     */
    constructor(context?: Context) {
        super({ view: Views.Settings, template, context });
    }

    /**
     * Отображает страницу
     */
    show(): void {
        super.show();
        this.context.SettingsGroup = [
            new FormList({
                id: 'settings__photo',
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
                        id: 'settings__new-photo'
                    }
                ]
            }).render(),
            new FormList({
                id: 'settings__form',
                formList: [
                    {
                        loading: true,
                        top: 'Имя',
                        id: 'name_form-item',
                        children: new Input({
                            disabled: true,
                            id: 'name',
                            placeholder: 'Имя'
                        }).render()
                    },
                    {
                        loading: true,
                        top: 'Дата рождения',
                        id: 'settings_birthday_from-item',
                        children: new DateInput({
                            disabled: true,
                            id: 'settings_birthday'
                        }).render()
                    },
                    {
                        loading: true,
                        top: 'Почта',
                        id: 'email_form-item',
                        children: new Input({
                            disabled: true,
                            type: 'email',
                            id: 'email',
                            placeholder: 'Почта'
                        }).render()
                    },
                    {
                        loading: true,
                        top: 'Описание профиля',
                        id: 'settings_description_form-item',
                        children: new Input({
                            disabled: true,
                            id: 'settings_description',
                            placeholder: 'Описание'
                        }).render()
                    },
                    {
                        loading: true,
                        top: 'Город',
                        id: 'settings_city_form-item',
                        children: new Input({
                            disabled: true,
                            id: 'settings_city',
                            placeholder: 'Город'
                        }).render()
                    },
                    {
                        loading: true,
                        top: 'Instagram',
                        id: 'settings_instagram_form-item',
                        children: new Input({
                            disabled: true,
                            id: 'settings_instagram',
                            placeholder: 'Instagram'
                        }).render()
                    },
                    {
                        loading: true,
                        top: 'Пол',
                        id: 'settings_sex_form-item',
                        children: new Select({
                            disabled: true,
                            id: 'settings_sex',
                            title: 'Пол',
                            options: ['Мужской', 'Женский']
                        }).render()
                    },
                    {
                        loading: true,
                        top: 'Пол соискателя',
                        id: 'settings__datePreference_form-item',
                        children: new Select({
                            required: true,
                            disabled: true,
                            id: 'settings__datePreference',
                            title: 'Пол соискателя',
                            options: ['Мужской', 'Женский', 'Оба']
                        }).render()
                    }
                ]
            }).render(),
            new FormList({
                id: 'settings__pass',
                formList: [
                    {
                        top: 'Старый Пароль',
                        id: 'settings_password_old_form-item',
                        children: new Input({
                            type: 'password',
                            id: 'settings_password_old',
                            placeholder: 'Старый пароль'
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
                        id: 'settings_password_new_repeat_form-item',
                        children: new Input({
                            type: 'password',
                            id: 'settings_password_new_repeat',
                            placeholder: 'Новый пароль еще раз'
                        }).render(),
                        bottom: validationsErrors.password
                    }
                ]
            }).render()
        ];

        this.context.Submit = new FormItem({
            children: new Button({
                id: 'settings__form-submit',
                type: 'submit',
                text: 'Сохранить'
            }).render()
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

export default SettingsView;

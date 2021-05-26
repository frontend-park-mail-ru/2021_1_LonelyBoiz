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
import './SettingsView.scss';
import Cell from '../../components/Cell/Cell';
import IconClass from '../../components/Icon/Icon';
import { IconsSrc } from '../../consts/icons';
import Flex from '../../components/Flex/Flex';

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
                                placeholder: 'Добавить фотографию',
                                accept: '.jpg,.jpeg,.png'
                            }).render()
                        }).render(),
                        bottom: 'Максимальный размер: 10 МБ'
                    },
                    {
                        id: 'settings__new-photo'
                    },
                    {
                        id: 'settings__filter-button'
                    },
                    {
                        children: new Button({
                            type: 'button',
                            id: 'input_avatar__save-button',
                            mode: 'primary',
                            text: 'Загрузить'
                        }).render()
                    },
                    {
                        loading: true,
                        id: 'drag-photo'
                    }
                ]
            }).render(),
            new FormList({
                id: 'settings__photo__secret',
                formList: [
                    {
                        children: new Button({
                            type: 'button',
                            id: 'input_avatar__button__secret',
                            mode: 'secondary',
                            text: new Input({
                                id: 'input_avatar__secret',
                                type: 'file',
                                placeholder: 'Добавить фотографию',
                                accept: '.jpg,.jpeg,.png'
                            }).render()
                        }).render(),
                        bottom: 'Максимальный размер: 10 МБ'
                    },
                    {
                        id: 'settings__new-photo__secret'
                    },
                    {
                        id: 'settings__filter-button__secret'
                    },
                    {
                        children: new Button({
                            type: 'button',
                            id: 'input_avatar__save-button__secret',
                            mode: 'primary',
                            text: 'Загрузить'
                        }).render()
                    },
                    {
                        loading: true,
                        id: 'drag-photo__secret'
                    }
                ]
            }).render(),
            new FormList({
                id: 'settings__main',
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
                        top: 'Рост',
                        id: 'settings_height_form-item',
                        children: new Input({
                            minValue: '1',
                            maxValue: '272',
                            type: 'number',
                            disabled: true,
                            id: 'settings_height',
                            placeholder: 'Рост'
                        }).render()
                    },
                    {
                        loading: true,
                        top: 'Вес',
                        id: 'settings_weight_form-item',
                        children: new Input({
                            minValue: '1',
                            maxValue: '445',
                            type: 'number',
                            disabled: true,
                            id: 'settings_weight',
                            placeholder: 'Вес'
                        }).render()
                    },
                    {
                        loading: true,
                        top: 'Пол партнера',
                        id: 'settings__datePreference_form-item',
                        children: new Select({
                            required: true,
                            disabled: true,
                            id: 'settings__datePreference',
                            title: 'Пол партнера',
                            options: ['Мужской', 'Женский', 'Оба']
                        }).render()
                    },
                    {
                        children: new Button({
                            mode: 'destructive',
                            id: 'logout',
                            type: 'button',
                            text: 'Выйти'
                        }).render()
                    }
                ]
            }).render(),
            new FormList({
                id: 'settings__password',
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
            }).render(),
            new FormList({
                id: 'settings__filter',
                formList: [
                    {
                        top: 'Рост партнера',
                        id: 'settings_partner-height_form-item',
                        children: new Flex([
                            new Input({
                                type: 'number',
                                id: 'settings_partner-height-bot',
                                placeholder: 'От'
                            }).render(),
                            new Input({
                                type: 'number',
                                id: 'settings_partner-height-top',
                                placeholder: 'До'
                            }).render()
                        ]).render()
                    },
                    {
                        top: 'Вес партнера',
                        id: 'settings_partner-weight_form-item',
                        children: new Flex([
                            new Input({
                                type: 'number',
                                id: 'settings_partner-weight-bot',
                                placeholder: 'От'
                            }).render(),
                            new Input({
                                type: 'number',
                                id: 'settings_partner-weight-top',
                                placeholder: 'До'
                            }).render()
                        ]).render()
                    },
                    {
                        top: 'Возраст партнера',
                        id: 'settings_partner-age_form-item',
                        children: new Flex([
                            new Input({
                                minValue: '18',
                                type: 'number',
                                id: 'settings_partner-age-top',
                                placeholder: 'От'
                            }).render(),
                            new Input({
                                type: 'number',
                                id: 'settings_partner-age-bot',
                                placeholder: 'До'
                            }).render()
                        ]).render()
                    }
                ]
            }).render()
        ];

        this.context.Submit = new FormItem({
            children: new Button({
                id: 'settings__submit',
                type: 'submit',
                text: 'Сохранить'
            }).render()
        }).render();

        this.context.settingsList = [
            new Cell({ id: 'settings-list__main', text: 'Основные' }).render(),
            new Cell({ id: 'settings-list__filter', text: 'Фильтр' }).render(),
            new Cell({ id: 'settings-list__photo', text: 'Фотографии' }).render(),
            new Cell({ id: 'settings-list__photo__secret', text: 'Скрытый альбом' }).render(),
            new Cell({ id: 'settings-list__password', text: 'Сменить пароль' }).render()
        ];

        this.context.payButton = new FormItem({
            children: new Button({
                mode: 'commerce',
                id: 'pay-button',
                text: 'Пополнить лайки'
            }).render()
        }).render();

        this.context.chevronBackCell = new Cell({
            id: 'settings__chevronBack',
            children: 'Назад',
            iconBefore: new IconClass({
                iconCode: IconsSrc.chevron_back,
                size: 28
            }).render()
        }).render();

        this.root.innerHTML = this.template(this.context);
    }
}

export default SettingsView;

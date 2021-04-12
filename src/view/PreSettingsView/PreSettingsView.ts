import Input from '../../components/Input/Input';
import FormList from '../../components/FormList/FormList';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import FormItem from '../../components/FormItem/FormItem';
import BaseView from '../BaseView';
import Views from '../../consts/views';
import template from './PreSettingsView.hbs';
import Context from '../../utils/Context';
import './PreSettingsView.css';

/**
 * @class
 * Страница предвартиельных настроек
 */
class PreSettingsView extends BaseView {
    /**
     * Создает экземпляр PreSettings
     *
     * @constructor
     * @this  {PreSettingsView}
     * @param {Context} context
     */
    constructor(context?: Context) {
        super({ view: Views.PreSettings, template, context });
    }

    /**
     * Отображает страницу
     */
    show(): void {
        super.show();
        this.context.SettingsGroup = [
            new FormList({
                id: 'pre-settings__photo',
                formList: [
                    {
                        children: new Button({
                            type: 'button',
                            id: 'input_avatar__button',
                            mode: 'secondary',
                            text: new Input({
                                id: 'input_avatar',
                                type: 'file',
                                placeholder: 'Добавить аватарку',
                                accept: '.jpg,.jpeg,.png',
                                required: true
                            }).render()
                        }).render()
                    },
                    {
                        id: 'pre-settings__new-photo'
                    }
                ]
            }).render(),
            new FormList({
                id: 'pre-settings__form',
                formList: [
                    {
                        top: 'Имя',
                        id: 'name_form-item',
                        children: new Input({
                            id: 'name',
                            placeholder: 'Имя'
                        }).render()
                    },
                    {
                        top: 'Пол',
                        id: 'pre-settings_sex_form-item',
                        children: new Select({
                            id: 'pre-settings_sex',
                            title: 'Пол',
                            options: ['Мужской', 'Женский']
                        }).render()
                    },
                    {
                        top: 'Пол соискателя',
                        id: 'pre-settings__datePreference_form-item',
                        children: new Select({
                            required: true,
                            id: 'pre-settings__datePreference',
                            title: 'Пол соискателя',
                            options: ['Мужской', 'Женский', 'Оба']
                        }).render()
                    }
                ]
            }).render()
        ];

        this.context.Submit = new FormItem({
            children: new Button({
                id: 'pre-settings__form-submit',
                type: 'submit',
                text: 'Сохранить'
            }).render()
        }).render();

        this.root.innerHTML = this.template(this.context);
    }
}

export default PreSettingsView;

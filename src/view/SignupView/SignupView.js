import MainLabel from '../../components/MainLabel/MainLabel.js';
import Input from '../../components/Input/Input.js';
import DateInput from '../../components/DateInput/DateInput.js';
import Button from '../../components/Button/Button.js';
import FormList from '../../components/FormList/FormList.js';
import Select from '../../components/Select/Select.js';
import FormItem from '../../components/FormItem/FormItem.js';
import validationsErrors from '../../consts/validationsErrors.js';
import BaseView from '../BaseView.js';
import Views from '../../consts/views.js';
import template from './SignupView.hbs';

/**
 * @class
 * Страница логина
 */
class SignupView extends BaseView {
    /**
     * Создает экземпляр signupView
     *
     * @constructor
     * @this  {SignupView}
     * @param {Object} context контекст для страницы регистрации
     */
    constructor(context) {
        super(Views.SignUp);
        this.template = template;
        this.context = context;
    }

    /**
     * Отображает страницу регистрации
     */
    show() {
        super.show();
        this.context.header = new MainLabel().render();

        this.context.form = new FormList({
            id: 'signup__form',
            formList: [
                {
                    top: 'Дата рождения',
                    id: 'signup_birthday_from-item',
                    children: new DateInput({
                        id: 'birthday'
                    }).render()
                },
                {
                    id: 'signup_name_form-item',
                    children: new Input({
                        required: true,
                        id: 'name',
                        placeholder: 'Имя'
                    }).render()
                },
                {
                    id: 'signup_mail_form-item',
                    children: new Input({
                        required: true,
                        type: 'email',
                        id: 'mail',
                        placeholder: 'Почта'
                    }).render()
                },
                {
                    top: 'Пол',
                    id: 'signup_sex_form-item',
                    children: new Select({
                        required: true,
                        id: 'sex',
                        title: 'Пол',
                        options: ['Мужской', 'Женский']
                    }).render()
                },
                {
                    id: 'signup_password_form-item',
                    children: new Input({
                        required: true,
                        type: 'password',
                        id: 'password',
                        placeholder: 'Пароль'
                    }).render()
                },
                {
                    id: 'signup_password_repeat_form-item',
                    children: new Input({
                        required: true,
                        type: 'password',
                        id: 'password_repeat',
                        placeholder: 'Пароль еще раз'
                    }).render(),
                    bottom: validationsErrors.password
                }
            ]
        }).render();

        this.context.Submit = new FormItem({
            children: new Button({
                id: 'signup__form-submit',
                type: 'submit',
                text: 'Регистрация'
            }).render()
        }).render();

        this.root.innerHTML = this.template(this.context);
    }
}

export default SignupView;

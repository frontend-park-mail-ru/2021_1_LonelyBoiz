import MainLabel from '../../components/MainLabel/MainLabel';
import Input from '../../components/Input/Input';
import DateInput from '../../components/DateInput/DateInput';
import Button from '../../components/Button/Button';
import FormList from '../../components/FormList/FormList';
import Select from '../../components/Select/Select';
import FormItem from '../../components/FormItem/FormItem';
import validationsErrors from '../../consts/validationsErrors';
import BaseView from '../BaseView';
import Views from '../../consts/views';
import template from './SignupView.hbs';
import Context from '../../utils/Context';
import './SignupView.css';

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
     * @param {Context} context контекст для страницы регистрации
     */
    constructor(context?: Context) {
        super({ view: Views.SignUp, template, context });
    }

    /**
     * Отображает страницу регистрации
     */
    show(): void {
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

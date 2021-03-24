import MainLabel from '../../components/MainLabel/MainLabel.js';
import Input from '../../components/Input/Input.js';
import DateInput from '../../components/DateInput/DateInput.js';
import Button from '../../components/Button/Button.js';
import FormList from '../../components/FormList/FormList.js';
import Select from '../../components/Select/Select.js';
import FormItem from '../../components/FormItem/FormItem.js';
import validationsErrors from '../../consts/validationsErrors.js';

const signupViewTemplate = 'SignupView.hbs';

/**
 * @class
 * Страница логина
 */
class SignupView {
    /**
     * Создает экземпляр signupView
     *
     * @constructor
     * @this  {SignupView}
     * @param {Object} context контекст для страницы регистрации
     */
    constructor(context) {
        this.template = Handlebars.templates[signupViewTemplate];
        this.root = document.getElementById('app');
        this.context = context;
    }

    /**
     * Отображает страницу регистрации
     */
    show() {
        this.context.header = new MainLabel().render();

        this.context.form = new FormList({
            formList: [
                {
                    id: 'signup_name_form-item',
                    children: new Input({
                        id: 'name',
                        placeholder: 'Имя'
                    }).render()
                },
                {
                    top: 'Дата рождения',
                    id: 'signup_birthday_from-item',
                    children: new DateInput({
                        id: 'birthday'
                    }).render()
                },
                {
                    id: 'signup_mail_form-item',
                    children: new Input({
                        type: 'mail',
                        id: 'mail',
                        placeholder: 'Почта'
                    }).render()
                },
                {
                    top: 'Пол',
                    id: 'signup_sex_form-item',
                    children: new Select({
                        id: 'sex',
                        title: 'Пол',
                        options: ['Мужской', 'Женский']
                    }).render()
                },
                {
                    id: 'signup_password_form-item',
                    children: new Input({
                        type: 'password',
                        id: 'password',
                        placeholder: 'Пароль'
                    }).render(),
                    bottom: validationsErrors.password
                },
                {
                    id: 'signup_password_repeat_form-item',
                    children: new Input({
                        type: 'password',
                        id: 'password_repeat',
                        placeholder: 'Пароль еще раз'
                    }).render()
                }
            ]
        }).render();

        this.context.Submit = new FormItem({
            children: new Button({
                id: 'signup__form',
                type: 'submit',
                text: 'Регистрация'
            }).render()
        }).render();

        this.root.innerHTML = this.template(this.context);
    }
}

export default SignupView;

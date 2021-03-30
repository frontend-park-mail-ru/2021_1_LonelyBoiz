import MainLabel from '../../components/MainLabel/MainLabel.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import FormList from '../../components/FormList/FormList.js';
import FormItem from '../../components/FormItem/FormItem.js';

const loginViewTemplate = 'LoginView.hbs';

/**
 * @class
 * Страница логина
 */
class LoginView {
    /**
     * Создает экземпляр LoginView
     *
     * @constructor
     * @this  {LoginView}
     * @param {Object} context контекст для страницы логина
     */
    constructor(context) {
        this.template = Handlebars.templates[loginViewTemplate];
        this.root = document.getElementById('app');
        this.context = context;
    }

    /**
     * Отображает страницу логина
     */
    show() {
        this.context.header = new MainLabel().render();


        this.context.form = new FormList({
            id: 'login__form',
            formList: [
                {
                    id: 'login_mail_form-item',
                    children: new Input({
                        required: true,
                        type: 'mail',
                        id: 'mail',
                        placeholder: 'Почта'
                    }).render()
                },
                {
                    id: 'login_password_form-item',
                    children: new Input({
                        required: true,
                        type: 'password',
                        id: 'password',
                        placeholder: 'Пароль'
                    }).render()
                }
            ]
        }).render();

        this.context.Submit = new FormItem({
            children: new Button({
                id: 'login__form-submit',
                type: 'submit',
                text: 'Вход'
            }).render()
        }).render();


        this.root.innerHTML = this.template(this.context);
    }
}

export default LoginView;

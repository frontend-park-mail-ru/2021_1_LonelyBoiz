import MainLabel from '../../components/MainLabel/MainLabel';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import FormList from '../../components/FormList/FormList';
import FormItem from '../../components/FormItem/FormItem';
import BaseView from '../BaseView';
import Views from '../../consts/views';
import template from './LoginView.hbs';
import Context from '../../utils/Context';
import './LoginView.css';

/**
 * @class
 * Страница логина
 */
class LoginView extends BaseView {
    /**
     * Создает экземпляр LoginView
     *
     * @constructor
     * @this  {LoginView}
     * @param {Context} context контекст для страницы логина
     */
    constructor(context?: Context) {
        super({ view: Views.Login, template, context });
    }

    /**
     * Отображает страницу логина
     */
    show(): void {
        super.show();
        this.context.header = new MainLabel().render();

        this.context.form = new FormList({
            id: 'login__form',
            formList: [
                {
                    id: 'login_mail_form-item',
                    children: new Input({
                        required: true,
                        type: 'email',
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

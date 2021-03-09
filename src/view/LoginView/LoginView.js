import MainLabel from '../../components/MainLabel/MainLabel.js';
import Form from '../../components/Form/Form.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';

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
    constructor (context) {
        this.template = Handlebars.templates[loginViewTemplate];
        this.root = document.getElementById('app');
        this.context = context;
    }

    /**
     * Отображает страницу логина
     */
    show () {
        this.context.header = new MainLabel().render();

        this.context.form = new Form({
            inputs: [
                new Input({ type: 'text', placeholder: 'Почта' }).render(),
                new Input({ type: 'password', placeholder: 'Пароль' }).render()
            ],
            button: new Button({ text: 'Вход' }).render()
        }).render();

        this.root.innerHTML = this.template(this.context);
    }
}

export default LoginView;

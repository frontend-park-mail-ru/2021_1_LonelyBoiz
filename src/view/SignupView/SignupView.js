import Form from '../../components/Form/Form.js';
import MainLabel from '../../components/MainLabel/MainLabel.js';
import Input from '../../components/Input/Input.js';
import DateInput from '../../components/DateInput/DateInput.js';
import Button from '../../components/Button/Button.js';

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

        this.context.form = new Form({
            inputs: [
                new Input({ type: 'text', placeholder: 'Почта', id: 'mail' }).render(),
                new Input({ type: 'text', placeholder: 'Имя', id: 'name' }).render(),
                new DateInput({ monthsId: 'months', daysId: 'days', yearsId: 'years' }).render(),
                new Input({ type: 'password', placeholder: 'Пароль', id: 'password' }).render(),
                new Input({ type: 'password', placeholder: 'Повторите пароль', id: 'password_repeat' }).render()
            ],
            button: new Button({ text: 'Вход' }).render()
        }).render();

        this.root.innerHTML = this.template(this.context);
    }
}

export default SignupView;

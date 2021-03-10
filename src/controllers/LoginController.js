import { sendLoginData } from '../models/AuthModel.js';
import BaseController from './BaseController.js';
import LoginView from '../view/LoginView/LoginView.js';
import eventBus from '../utils/eventBus.js';
import Events from '../consts/events.js';
import Routes from '../consts/routes.js';
import { validateMail, validatePassword } from '../utils/validation.js';

/**
 * @class
 * Контроллер логина
 */
class LoginController extends BaseController {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {LoginController}
     */
    constructor() {
        super(new LoginView({
            signupHref: 'signup'
        }));
    }

    /**
     * Запускает контроллер
     */
    start() {
        this.view.show();

        eventBus.connect(Events.mailValidationFailed, this.onMailValidationError);
        eventBus.connect(Events.passwordValidationFailed, this.onPasswordValidationError);
        eventBus.connect(Events.formError, this.onFormError);
        eventBus.connect(Events.formSubmitted, this.onSubmit);
        this.registerListener({
            element: document.querySelector('.button-block__button'),
            type: 'click',
            listener: (e) => { e.preventDefault(); eventBus.emit(Events.formSubmitted); }
        });
        this.registerListener({
            element: document.querySelector('.login-block__link'),
            type: 'click',
            listener: (e) => { e.preventDefault(); eventBus.emit(Events.routeChange, Routes.signupRoute); }
        });
    }

    /**
     * Завершает контроллер
     */
    finish() {
        eventBus.disconnect(Events.mailValidationFailed, this.onMailValidationError);
        eventBus.disconnect(Events.passwordValidationFailed, this.onPasswordValidationError);
        eventBus.disconnect(Events.formError, this.onFormError);
        eventBus.disconnect(Events.formSubmitted, this.onSubmit);
        this.deleteListeners();
    }

    /**
     * Валидирует поля и делает запрос на сервер
     */
    onSubmit() {
        let validForms = 0;
        const mail = document.getElementById('mail');
        if (!validateMail(mail.value)) {
            eventBus.emit(Events.formError, {text: 'Неверный логин или пароль'});
        } else {
            mail.classList.remove('input-block__input_error');
            validForms += 1;
        }

        const password = document.getElementById('password');
        if (!validatePassword(password.value)) {
            eventBus.emit(Events.formError, {text: 'Неверный логин или пароль'});
        } else {
            password.classList.remove('input-block__input_error');
            validForms += 1;
        }

        if (validForms < 2) {
            eventBus.emit(Events.formError, { text: 'Неверный логин или пароль' });
            return;
        }

        const errorBlock = document.querySelector('.login-block__error');
        errorBlock.classList.add('login-block__error-hidden');

        sendLoginData({ mail: mail.value, password: password.value })
            .then((json) => {
                if (json.error) {
                    eventBus.emit(Events.formError, { text: 'Неверный логин или пароль' });
                } else {
                    window.localStorage.setItem('u-id', json.id);
                    if (json.avatar) {
                        window.localStorage.setItem('u-avatar', json.avatar)
                    }
                    eventBus.emit(Events.routeChange, Routes.homeRoute);
                }
            })
            .catch((reason) => console.log('error:', reason));
    }

    /**
     * Обрабатывает ошибку валидации почты
     *
     * @params {Object} data объект с аргументами для обработчика
     */
    onMailValidationError(data) {
        const mailInput = document.getElementById('mail');
        mailInput.classList.add('input-block__input_error');

        if (data) {
            const errorBlock = document.querySelector('.login-block__error');
            errorBlock.classList.remove('login-block__error-hidden');
            errorBlock.textContent = data.text;
        }
    }

    /**
     * Обрабатывает ошибку валидации пароля
     *
     * @params {Object} data объект с аргументами для обработчика
     */
    onPasswordValidationError(data) {
        const passwordInput = document.getElementById('password');
        passwordInput.classList.add('input-block__input_error');

        if (data) {
            const errorBlock = document.querySelector('.login-block__error');
            errorBlock.classList.remove('login-block__error-hidden');
            errorBlock.textContent = data.text;
        }
    }

    /**
     * Обрабатывает ошибку формы
     *
     * @params {Object} data объект с аргументами для обработчика
     */
    onFormError(data) {
        const errorBlock = document.querySelector('.login-block__error');
        errorBlock.classList.remove('login-block__error-hidden');
        errorBlock.textContent = data.text;
    }
}

export default LoginController;

import { sendSignUpData } from '../models/AuthModel.js';
import BaseController from './BaseController.js';
import SignupView from '../view/SignupView/SignupView.js';
import eventBus from '../utils/eventBus.js';
import Routes from '../consts/routes.js';
import Events from '../consts/events.js';
import {
    validateMail,
    validatePassword,
    validateName,
    validateBirthday,
    validatePasswordRepeat
} from '../utils/validation.js';

/**
 * @class
 * Контроллер логина
 */
class SignupController extends BaseController {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {SignupController}
     */
    constructor() {
        super(new SignupView({
            loginHref: 'login'
        }));
    }

    /**
     * Запускает контроллер
     */
    start() {
        this.view.show();

        eventBus.connect(Events.mailValidationFailed, this.onMailValidationError);
        eventBus.connect(Events.nameValidationFailed, this.onNameValidationError);
        eventBus.connect(Events.dateValidationFailed, this.onBirthdayValidationError);
        eventBus.connect(Events.passwordValidationFailed, this.onPasswordValidationError);
        eventBus.connect(Events.passwordMatchFailed, this.onPasswordRepeatValidationError);
        eventBus.connect(Events.formError, this.onFormError);
        eventBus.connect(Events.formSubmitted, this.onSubmit);
        this.registerListener({
            element: document.querySelector('.button-block__button'),
            type: 'click',
            listener: (e) => { e.preventDefault(); eventBus.emit(Events.formSubmitted); }
        });
        this.registerListener({
            element: document.querySelector('.signup-block__link'),
            type: 'click',
            listener: (e) => { e.preventDefault(); eventBus.emit(Events.routeChange, Routes.loginRoute); }
        });
    }

    /**
     * Завершает контроллер
     */
    finish() {
        eventBus.disconnect(Events.mailValidationFailed, this.onMailValidationError);
        eventBus.disconnect(Events.nameValidationFailed, this.onNameValidationError);
        eventBus.disconnect(Events.dateValidationFailed, this.onBirthdayValidationError);
        eventBus.disconnect(Events.passwordValidationFailed, this.onPasswordValidationError);
        eventBus.disconnect(Events.passwordMatchFailed, this.onPasswordRepeatValidationError);
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
            eventBus.emit(Events.mailValidationFailed, { text: 'Некорректная почта' });
            return;
        } else {
            mail.classList.remove('input-block__input_error');
            validForms += 1;
        }

        const name = document.getElementById('name');
        if (!validateName(name.value)) {
            eventBus.emit(Events.nameValidationFailed, { text: 'Имя должно состоять только из букв' });
            return;
        } else {
            name.classList.remove('input-block__input_error');
            validForms += 1;
        }

        const monthsSelect = document.getElementById('months');
        const daysSelect = document.getElementById('days');
        const yearsSelect = document.getElementById('years');
        const date = new Date(
            yearsSelect.options[yearsSelect.selectedIndex].label,
            monthsSelect.value,
            parseInt(daysSelect.value) + 1
        );
        if (!validateBirthday(date)) {
            eventBus.emit(Events.dateValidationFailed, { text: 'Регистрация доступна только совершеннолетним' });
            return;
        } else {
            [monthsSelect, daysSelect, yearsSelect]
                .forEach((select) => { select.classList.remove('select-block__select_error'); });
            validForms += 1;
        }

        const password = document.getElementById('password');
        if (!validatePassword(password.value)) {
            eventBus.emit(Events.passwordValidationFailed, {
                text: 'Пароль должен:\nБыть  написан на латинице\n' +
            'Использовать как минимум 1 заглавную букву\n' +
            'Использовать как минимум 1 цифру\n'
            });
            return;
        } else {
            password.classList.remove('input-block__input_error');
            validForms += 1;
        }

        const passwordRepeat = document.getElementById('password_repeat');
        if (!validatePasswordRepeat(password.value, passwordRepeat.value)) {
            eventBus.emit(Events.passwordMatchFailed, {
                text: 'Пароли не совпадают'
            });
            return;
        } else {
            passwordRepeat.classList.remove('input-block__input_error');
            validForms += 1;
        }

        if (validForms < 5) {
            return;
        }

        const errorBlock = document.querySelector('.signup-block__error');
        errorBlock.classList.add('signup-block__error-hidden');

        sendSignUpData({
            mail: mail.value,
            name: name.value,
            birthday: date.getTime(),
            password: password.value,
            passwordRepeat: passwordRepeat.value
        })
            .then((json) => {
                if (json.error) {
                    eventBus.emit(Events.formError, { text: json.error });
                } else {
                    this.storage.setItem('u-id', json.id);
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
            const errorBlock = document.querySelector('.signup-block__error');
            errorBlock.classList.remove('signup-block__error-hidden');
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
            const errorBlock = document.querySelector('.signup-block__error');
            errorBlock.classList.remove('signup-block__error-hidden');
            errorBlock.textContent = data.text;
        }
    }

    /**
     * Обрабатывает ошибку валидации дня рождения
     *
     * @params {Object} data объект с аргументами для обработчика
     */
    onBirthdayValidationError(data) {
        const selects = document.querySelectorAll('.select-block__select');

        selects.forEach((select) => { select.classList.add('select-block__select_error'); });

        if (data) {
            const errorBlock = document.querySelector('.signup-block__error');
            errorBlock.classList.remove('signup-block__error-hidden');
            errorBlock.textContent = data.text;
        }
    }

    /**
     * Обрабатывает ошибку совпадения паролей
     *
     * @params {Object} data объект с аргументами для обработчика
     */
    onPasswordRepeatValidationError(data) {
        const passwordInput = document.getElementById('password_repeat');
        passwordInput.classList.add('input-block__input_error');

        if (data) {
            const errorBlock = document.querySelector('.signup-block__error');
            errorBlock.classList.remove('signup-block__error-hidden');
            errorBlock.textContent = data.text;
        }
    }

    /**
     * Обрабатывает ошибку валидации имени
     *
     * @params {Object} data объект с аргументами для обработчика
     */
    onNameValidationError(data) {
        const nameInput = document.getElementById('name');
        nameInput.classList.add('input-block__input_error');

        if (data) {
            const errorBlock = document.querySelector('.signup-block__error');
            errorBlock.classList.remove('signup-block__error-hidden');
            errorBlock.textContent = data.text;
        }
    }

    /**
     * Обрабатывает ошибку формы
     *
     * @params {Object} data объект с аргументами для обработчика
     */
    onFormError(data) {
        const errorBlock = document.querySelector('.signup-block__error');
        errorBlock.classList.remove('signup-block__error-hidden');
        errorBlock.textContent = data.text;
    }
}

export default SignupController;

import { sendSignUpData } from '../models/AuthModel.js';
import BaseController from './BaseController.js';
import SignupView from '../view/SignupView/SignupView.js';
import eventBus from '../utils/eventBus.js';
import Routes from '../consts/routes.js';
import Events from '../consts/events.js';
import { sexEnum } from '../consts/sexEnum.js';
import {
    validateForm,
    checkForm,
    processingResultForms
} from '../utils/form.js';
import ScreenSpinnerClass from '../utils/ScreenSpinner.js';
import { IconsSrc } from '../consts/icons.js';
import IconClass from '../components/Icon/Icon.js';

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
        super(
            new SignupView({
                loginHref: 'login'
            })
        );

        this.formSuccess = false;
        this.signupList = {
            name: {
                id: 'name',
                formItemId: 'signup_name_form-item',
                required: true
            },
            mail: {
                id: 'mail',
                formItemId: 'signup_mail_form-item',
                required: true
            },
            sex: {
                id: 'sex',
                formItemId: 'signup_sex_form-item',
                required: true,
                value: String(sexEnum.male)
            },
            password: {
                id: 'password',
                formItemId: 'signup_password_form-item',
                required: true
            },
            passwordRepeat: {
                id: 'password_repeat',
                formItemId: 'signup_password_repeat_form-item',
                required: true
            },
            birthday: {
                id: 'birthday',
                formItemId: 'signup_birthday_from-item'
            }
        };
    }

    /**
     * Запускает контроллер
     */
    start() {
        this.view.show();
        validateForm.call(this, this.signupList);
        this.formSubmit();

        this.registerListener({
            element: document.querySelector('.signup-block__link'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                eventBus.emit(Events.routeChange, Routes.loginRoute);
            }
        });
    }

    /**
     * Подписывается на заполнение формы
     */
    formSubmit() {
        this.registerListener({
            element: document.getElementById('signup__form'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit(e);
            }
        });

        this.registerListener({
            element: document.getElementById('signup__form-submit'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit(e);
            }
        });
    }

    /**
     * Завершает контроллер
     */
    finish() {
        this.deleteListeners();
    }

    /**
     * Валидирует поля и делает запрос на сервер
     */
    onSubmit(e) {
        this.formSuccess = checkForm.call(this, this.signupList);
        const tmpForm = {};
        Object.entries(this.signupList).forEach((item) => {
            const [key, obj] = item;
            if (obj.value && obj.valid) {
                tmpForm[key] = obj.value;
            }
        });

        if (this.formSuccess) {
            const popout = new ScreenSpinnerClass({});

            sendSignUpData(tmpForm)
                .finally(() => {
                    popout.destroy();
                })
                .then((json) => {
                    processingResultForms({
                        data: json || {},
                        errorBlockId: 'signup-error',
                        formList: this.signupList
                    }).then((json) => {
                        window.localStorage.setItem('u-id', json.id);
                        if (json.avatar) {
                            window.localStorage.setItem(
                                'u-avatar',
                                json.avatar
                            );
                        }
                        eventBus.emit(Events.routeChange, Routes.homeRoute);
                    });
                })
                .catch((reason) => {
                    console.error('error:', reason);
                    eventBus.emit(Events.pushNotifications, {
                        before: new IconClass({
                            iconCode: IconsSrc.error_circle,
                            iconClasses: 'error-icon'
                        }).render(),
                        children: 'Что-то не то с интернетом('
                    });
                });
        }
    }
}

export default SignupController;

import { sendLoginData } from '../models/AuthModel.js';
import BaseController from './BaseController.js';
import LoginView from '../view/LoginView/LoginView.js';
import eventBus from '../utils/eventBus.js';
import Events from '../consts/events.js';
import Routes from '../consts/routes.js';
import { IconsSrc } from '../consts/icons.js';
import IconClass from '../components/Icon/Icon.js';
import {
    validateForm,
    checkForm,
    processingResultForms
} from '../utils/form.js';
import ScreenSpinnerClass from '../utils/ScreenSpinner.js';

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
        super(
            new LoginView({
                signupHref: 'signup'
            })
        );

        this.formSuccess = false;
        this.loginList = {
            mail: {
                id: 'mail',
                formItemId: 'login_mail_form-item',
                required: true
            },
            password: {
                id: 'password',
                formItemId: 'login_password_form-item',
                required: true
            }
        };
    }

    /**
     * Запускает контроллер
     */
    start() {
        this.view.show();
        validateForm.call(this, this.loginList);
        this.formSubmit();

        this.registerListener({
            element: document.querySelector('.login-block__link'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                eventBus.emit(Events.routeChange, Routes.signupRoute);
            }
        });
    }

    /**
     * Подписывается на заполнение формы
     */
    formSubmit() {
        this.registerListener({
            element: document.getElementById('login__form'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit(e);
            }
        });

        this.registerListener({
            element: document.getElementById('login__form-submit'),
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
    onSubmit() {
        this.formSuccess = checkForm.call(this, this.loginList);
        const tmpForm = {};
        Object.entries(this.loginList).forEach((item) => {
            const [key, obj] = item;
            if (obj.value && obj.valid) {
                tmpForm[key] = obj.value;
            }
        });

        if (this.formSuccess) {
            const popout = new ScreenSpinnerClass({});
            sendLoginData(tmpForm)
                .finally(() => {
                    popout.destroy();
                })
                .then((json) => {
                    console.log(json);
                    processingResultForms({
                        data: json || {},
                        errorBlockId: 'login-error',
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

export default LoginController;

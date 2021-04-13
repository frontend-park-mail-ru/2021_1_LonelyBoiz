import BaseController from './BaseController';
import LoginView from '../view/LoginView/LoginView';
import eventBus from '../utils/eventBus';
import Events from '../consts/events';
import Routes from '../consts/routes';
import { IconsSrc } from '../consts/icons';
import IconClass from '../components/Icon/Icon';
import userModel from '../models/UserModel';
import {
    validateForm,
    checkForm,
    processingResultForms,
    IFormList
} from '../utils/form';
import ScreenSpinnerClass from '../utils/ScreenSpinner';
import Context from '../utils/Context';

/**
 * @class
 * Контроллер логина
 */
class LoginController extends BaseController {
    formSuccess = false;
    loginList: IFormList = {
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

    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {LoginController}
     */
    constructor() {
        super({
            view: new LoginView()
        });
    }

    /**
     * Запускает контроллер
     */
    start(queryParams: Context): void {
        this.queryParams = queryParams;
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
    formSubmit(): void {
        this.registerListener({
            element: document.getElementById('login__form'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('login__form-submit'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });
    }

    /**
     * Завершает контроллер
     */
    finish(): void {
        this.deleteListeners();
    }

    /**
     * Валидирует поля и делает запрос на сервер
     */
    onSubmit(): void {
        this.formSuccess = checkForm.call(this, this.loginList);
        const tmpForm: IFormList = {};
        Object.entries(this.loginList).forEach((item) => {
            const [key, obj] = item;
            if (obj.value && obj.valid) {
                tmpForm[<keyof IFormList>key] = obj.value;
            }
        });

        if (this.formSuccess) {
            const popout = new ScreenSpinnerClass();
            userModel
                .set(tmpForm)
                .login()
                .finally(() => {
                    popout.destroy();
                })
                .then((response) => {
                    const json = response.json;
                    processingResultForms({
                        data: json || {},
                        errorBlockId: 'login-error',
                        formList: this.loginList
                    }).then(_ => {
                        eventBus.emit(Events.updateAvatar);
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

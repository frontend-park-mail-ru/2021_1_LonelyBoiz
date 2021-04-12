import BaseController from './BaseController';
import { ISettingsList } from './SettingsController';
import SignupView from '../view/SignupView/SignupView';
import eventBus from '../utils/eventBus';
import Routes from '../consts/routes';
import Events from '../consts/events';
import {
    validateForm,
    checkForm,
    processingResultForms
} from '../utils/form';
import ScreenSpinnerClass from '../utils/ScreenSpinner';
import { IconsSrc } from '../consts/icons';
import IconClass from '../components/Icon/Icon';
import userModel from '../models/UserModel';
import Context from '../utils/Context';

/**
 * @class
 * Контроллер логина
 */
class SignupController extends BaseController {
    formSuccess = false;

    signupList: ISettingsList = {
        mail: {
            id: 'mail',
            formItemId: 'signup_mail_form-item',
            required: true
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

    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {SignupController}
     */
    constructor() {
        super({
            view: new SignupView()
        });
    }

    /**
     * Запускает контроллер
     */
    start(queryParams: Context): void {
        this.queryParams = queryParams;
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
    formSubmit(): void {
        this.registerListener({
            element: document.getElementById('signup__form'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('signup__form-submit'),
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
        this.formSuccess = checkForm.call(this, this.signupList);
        const tmpForm = {};
        Object.entries(this.signupList).forEach((item) => {
            const [key, obj] = item;
            if (obj.value && obj.valid) {
                tmpForm[key] = obj.value;
            }
        });

        if (this.formSuccess) {
            const popout = new ScreenSpinnerClass();

            userModel
                .set(tmpForm)
                .create()
                .finally(() => {
                    popout.destroy();
                })
                .then((response) => {
                    const json = response.json;
                    processingResultForms({
                        data: json || {},
                        errorBlockId: 'signup-error',
                        formList: this.signupList
                    }).then(() => {
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

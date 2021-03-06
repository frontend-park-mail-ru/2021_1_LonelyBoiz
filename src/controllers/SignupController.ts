import BaseController from './BaseController';
import SignupView from '../view/SignupView/SignupView';
import eventBus from '../utils/eventBus';
import Routes from '../consts/routes';
import Events from '../consts/events';
import { validateForm, checkForm, processingResultForms, IFormList } from '../utils/form';
import ScreenSpinnerClass from '../utils/ScreenSpinner';
import userModel, { IUserModel } from '../models/UserModel';
import Context from '../utils/Context';
import captcha from '../utils/captcha';
import { badInternet } from '../utils/helpers';

/**
 * @class
 * Контроллер логина
 */
class SignupController extends BaseController {
    formSuccess = false;

    signupList: IFormList = {
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
     * @param {Context} queryParams
     */
    start(queryParams: Context): void {
        this.queryParams = queryParams;
        this.view.show();
        validateForm.call(this, this.signupList);
        this.formSubmit();
    }

    /**
     * Подписывается на заполнение формы
     */
    formSubmit(): void {
        this.registerListener({
            element: document.querySelector('.signup-block__link'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                eventBus.emit(Events.routeChange, Routes.loginRoute);
            }
        });

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
     * Валидирует поля и делает запрос на сервер
     */
    onSubmit(): void {
        this.formSuccess = checkForm.call(this, this.signupList);
        let tmpForm: IUserModel = {};
        Object.entries(this.signupList).forEach((item) => {
            const [key, obj] = item as [keyof IUserModel, Context];
            if (obj.value && obj.valid) {
                tmpForm = { ...tmpForm, [key]: obj.value };
            }
        });

        if (this.formSuccess) {
            const popout = new ScreenSpinnerClass();

            captcha((token: string) => {
                tmpForm.captchaToken = token;

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
                            eventBus.emit(Events.updateAvatar);
                            eventBus.emit(Events.routeChange, Routes.preSettingsRoute);
                        });
                    })
                    .catch((reason) => {
                        console.error('error:', reason);
                        badInternet();
                    });
            });
        }
    }
}

export default SignupController;

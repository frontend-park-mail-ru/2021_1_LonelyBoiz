import { sendSignUpData } from '../models/AuthModel.js';
import BaseController from './BaseController.js';
import SignupView from '../view/SignupView/SignupView.js';
import eventBus from '../utils/eventBus.js';
import Routes from '../consts/routes.js';
import Events from '../consts/events.js';
import {
    validateFormMail,
    validateFormPassword,
    validateFormName,
    validateFormBirthday,
    validateFormPasswordRepeat,
    validateFormSex
} from '../utils/validationForm.js';

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

        this.signupList = {
            name: {
                id: 'name',
                formItemId: 'signup_name_form-item',
                validFunc: validateFormName
            },
            mail: {
                id: 'mail',
                formItemId: 'signup_mail_form-item',
                validFunc: validateFormMail
            },
            sex: {
                id: 'sex',
                formItemId: 'signup_sex_form-item',
                validFunc: validateFormSex
            },
            password: {
                id: 'password',
                formItemId: 'signup_password_form-item',
                validFunc: validateFormPassword
            },
            passwordRepeat: {
                id: 'password_repeat',
                formItemId: 'signup_password_repeat_form-item',
                validFunc: validateFormPasswordRepeat
            },
            birthday: {
                id: 'birthday',
                formItemId: 'signup_birthday_from-item',
                validFunc: validateFormBirthday
            }
        };
    }

    /**
     * Запускает контроллер
     */
    start() {
        this.view.show();
        this.registerInputListener();

        this.registerListener({
            element: document.getElementById('signup__form'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit(e);
            }
        });

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
     * Завершает контроллер
     */
    finish() {
        this.deleteListeners();
    }

    registerInputListener() {
        Object.entries(this.signupList).forEach((item, i) => {
            const [key, obj] = item;
            if (obj.validFunc && obj.validFunc !== null) {
                this.registerListener({
                    element: document.getElementById(obj.id),
                    type: 'change',
                    listener: (e) => {
                        switch (key) {
                        case 'passwordRepeat':
                            obj.validFunc(
                                obj.id,
                                this.signupList.password.id,
                                obj.formItemId
                            );
                            break;

                        default:
                            obj.validFunc(obj.id, obj.formItemId);
                            break;
                        }
                    }
                });
            }
        });
    }

    /**
     * Валидирует поля и делает запрос на сервер
     */
    onSubmit(e) {
        let success = true;
        const tmpForm = {};

        Object.entries(this.signupList).forEach((item, i) => {
            const [key, obj] = item;
            if (obj.validFunc && obj.validFunc !== null) {
                let validResult = {};
                switch (key) {
                case 'passwordRepeat':
                    validResult = obj.validFunc(
                        obj.id,
                        this.signupList.password.id,
                        obj.formItemId,
                        true
                    );
                    break;

                case 'password':
                    validResult = obj.validFunc(
                        obj.id,
                        obj.formItemId,
                        true
                    );
                    break;

                default:
                    validResult = obj.validFunc(obj.id, obj.formItemId);
                    break;
                }
                if (!validResult.valid) {
                    success = false;
                } else {
                    if (validResult.value && validResult.value !== null) {
                        if (key === 'birthday') {
                            tmpForm[key] = validResult.value.getTime() / 1000;
                        } else {
                            tmpForm[key] = validResult.value;
                        }
                    }
                }
            } else {
                tmpForm[key] = document.getElementById(obj.id).value;
            }
        });

        if (success) {
            sendSignUpData(tmpForm)
                .then((json) => {
                    if (json.error) {
                        eventBus.emit(Events.formError, { text: json.error });
                    } else {
                        window.localStorage.setItem('u-id', json.id);
                        if (json.avatar) {
                            window.localStorage.setItem(
                                'u-avatar',
                                json.avatar
                            );
                        }
                        eventBus.emit(Events.routeChange, Routes.homeRoute);
                    }
                })
                .catch((reason) => console.log('error:', reason));
        }
    }
}

export default SignupController;

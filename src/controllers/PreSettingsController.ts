import SettingsController from './SettingsController';
import PreSettings from '../view/PreSettingsView/PreSettingsView';
import eventBus from '../utils/eventBus';
import Routes from '../consts/routes';
import Events from '../consts/events';
import { validateForm, checkForm, processingResultForms, IFormList } from '../utils/form';
import ScreenSpinnerClass from '../utils/ScreenSpinner';
import { IconsSrc } from '../consts/icons';
import IconClass from '../components/Icon/Icon';
import userModel from '../models/UserModel';
import { datePreferenceEnum } from '../consts/sexEnum';

/**
 * @class
 * Контроллер логина
 */
class PreSettingsController extends SettingsController {
    preSettingsList: IFormList = {
        name: {
            id: 'name',
            formItemId: 'name_form-item',
            required: true
        },
        sex: {
            id: 'pre-settings_sex',
            formItemId: 'pre-settings_sex_form-item',
            required: true
        },
        datePreference: {
            id: 'pre-settings__datePreference',
            formItemId: 'pre-settings__datePreference_form-item',
            required: true
        }
    };

    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {PreSettingsController}
     */
    constructor() {
        super(new PreSettings());
    }

    /**
     * Запускает контроллер
     */
    start(): void {
        userModel
            .auth()
            .then((response) => {
                if (!response.ok) {
                    eventBus.emit(Events.routeChange, Routes.loginRoute);
                }
                this.view.show();
                validateForm.call(this, this.preSettingsList);
                this.formSubmit();

                (<HTMLInputElement>(
                    document.getElementById(this.preSettingsList.datePreference.id)
                )).value = datePreferenceEnum.female;
            })
            .catch((reason) => {
                eventBus.emit(Events.routeChange, Routes.loginRoute);
                console.error('Auth - error: ', reason);
            });
    }

    /**
     * Подписывается на заполнение формы
     */
    formSubmit(): void {
        this.registerListener({
            element: document.getElementById('pre-settings__form-submit'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('pre-settings__form'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('input_avatar'),
            type: 'change',
            listener: this.onFileUpload.bind(this)
        });

        this.registerListener({
            element: document.getElementById('input_avatar__button'),
            type: 'click',
            listener: () => {
                document.getElementById('input_avatar').click();
            }
        });
    }

    /**
     * Валидирует поля и делает запрос на сервер
     */
    onSubmit(): void {
        this.formSuccess = checkForm.call(this, this.preSettingsList);
        const tmpForm = {};
        Object.entries(this.preSettingsList).forEach((item) => {
            const [key, obj] = item;
            if ((obj.value && obj.valid) || !obj.required) {
                tmpForm[key] = obj.value;
            }
        });

        if (this.formSuccess) {
            if (this.file !== null) {
                tmpForm.avatar = this.file;
            }

            const popout = new ScreenSpinnerClass();

            userModel
                .update(tmpForm)
                .finally(() => {
                    popout.destroy();
                })
                .then((response) => {
                    const json = response.json;
                    processingResultForms({
                        data: json || {},
                        errorBlockId: 'pre-settings-error',
                        formList: this.preSettingsList
                    }).then(() => {
                        if (this.file !== null) {
                            window.localStorage.setItem('u-avatar', this.file);
                            (<HTMLImageElement>(
                                document.querySelector('.u-avatar-header')
                            )).src = this.file;
                        }
                    });
                })
                .catch((reason) => {
                    console.error(reason);
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

export default PreSettingsController;

import SettingsController from './SettingsController';
import PreSettings from '../view/PreSettingsView/PreSettingsView';
import eventBus from '../utils/eventBus';
import Routes from '../consts/routes';
import Events from '../consts/events';
import { validateForm, checkForm, processingResultForms, IFormList } from '../utils/form';
import ScreenSpinnerClass from '../utils/ScreenSpinner';
import userModel, { IUserModel } from '../models/UserModel';
import { datePreferenceEnum } from '../consts/sexEnum';
import { onPhotoUpload, setPhoto } from '../utils/photo';
import { badInternet } from '../utils/helpers';
import Context from '../utils/Context';

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
            id: 'settings_sex',
            formItemId: 'settings_sex_form-item',
            required: true
        },
        datePreference: {
            id: 'settings__datePreference',
            formItemId: 'settings__datePreference_form-item',
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
     * @param {Context} queryParams
     */
    start(queryParams: Context): void {
        this.queryParams = queryParams;
        super
            .auth()
            .then(() => {
                this.view.show();
                validateForm.call(this, this.preSettingsList);
                this.formSubmit();

                (document.getElementById(this.preSettingsList.datePreference.id) as HTMLInputElement).value =
                    String(datePreferenceEnum.female);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    /**
     * Подписывается на заполнение формы
     */
    formSubmit(): void {
        this.registerListener({
            element: document.getElementById('settings__submit'),
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('settings__main'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('input_avatar'),
            type: 'change',
            listener: (e) => {
                const currentTarget = <HTMLInputElement>e.target;
                const file = currentTarget.files[0];
                onPhotoUpload(file).then((file) => {
                    setPhoto(file, 'settings__new-photo', 'settings__photo');
                    this.file = file;
                });
            }
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
        let tmpForm: IUserModel = {};
        Object.entries(this.preSettingsList).forEach((item) => {
            const [key, obj] = item;
            if ((obj.value && obj.valid) || !obj.required) {
                tmpForm = { ...tmpForm, [key]: obj.value };
            }
        });

        if (!this.file) {
            eventBus.emit(Events.pushNotifications, {
                status: 'error',
                children: 'Чтобы продолжить, прикрепите аватарку :)'
            });
            return;
        }

        const popout = new ScreenSpinnerClass();
        if (this.formSuccess && this.file) {
            userModel
                .uploadPhoto(this.file)
                .then((photoResponse) => {
                    if (!photoResponse.ok) {
                        console.error('Failed to upload photo!');
                        return;
                    }
                    eventBus.emit(Events.updateAvatar);

                    tmpForm.photos = [photoResponse.json.photoId];

                    userModel
                        .update(tmpForm)
                        .finally(() => {
                            popout.destroy();
                        })
                        .then((response) => {
                            const json = response.json;
                            processingResultForms({
                                data: json || {},
                                errorBlockId: 'settings-error',
                                formList: this.settingsList
                            });
                            eventBus.emit(Events.routeChange, Routes.homeRoute);
                        })
                        .catch((reason) => {
                            console.error(reason);
                            badInternet();
                        });
                })
                .catch((photoReason) => {
                    popout.destroy();
                    badInternet();
                    console.error('Photo upload error - ', photoReason);
                });
        }
    }
}

export default PreSettingsController;

import BaseController from './BaseController';
import SettingsView from '../view/SettingsView/SettingsView';
import eventBus from '../utils/eventBus';
import Routes from '../consts/routes';
import Events from '../consts/events';
import { validateForm, checkForm, fillForm, IFormList } from '../utils/form';
import userModel from '../models/UserModel';
import chatModel from '../models/ChatModel';
import BaseView from '../view/BaseView';
import Context from '../utils/Context';
import webSocketListener from '../utils/WebSocketListener';
import FormItem from '../components/FormItem/FormItem';
import { onPhotoUpload, setPhoto } from '../utils/photo';
import DragableListClass from '../utils/DragableList';
import Img from '../components/Img/Img';
import { arrayMove, IResponseData, pushUploadPhotoError } from '../utils/helpers';
import PopoutWrapperClass from '../utils/PopoutWrapper';
import Pay from '../components/Pay/Pay';
import { patchUser } from '../utils/userPatch';
import AlbumModel from '../models/AlbumModel';
import { imageStorageLocation } from '../consts/config';

import FilterButton from '../components/FilterButton/FilterButton';

type TSettingsList = 'main' | 'filter' | 'photo' | 'photoSecret' | 'password';

type ISettingsGropus = {
    [key in TSettingsList]: IFormList;
};

type ISettingsGropusIds = {
    [key in TSettingsList]: string[];
};

type ISettingsListIds = {
    [key in TSettingsList]: string;
};

/**
 * @class
 * Контроллер логина
 */
class SettingsController extends BaseController {
    formSuccess = false;
    file: File = null;
    prevPage: string = null;
    dragMainPhoto: DragableListClass = null;
    dragSecretPhoto: DragableListClass = null;
    settingsGroupIds: ISettingsGropusIds = {
        main: ['settings__main'],
        filter: ['settings__filter'],
        photo: ['settings__photo'],
        photoSecret: ['settings__photo__secret'],
        password: ['settings__password']
    };

    settingsListIds: ISettingsListIds = {
        main: 'settings-list__main',
        filter: 'settings-list__filter',
        photo: 'settings-list__photo',
        photoSecret: 'settings-list__photo__secret',
        password: 'settings-list__password'
    };

    settingsGroup: ISettingsGropus = {
        main: {
            name: {
                id: 'name',
                formItemId: 'name_form-item',
                required: true
            },
            mail: {
                id: 'email',
                formItemId: 'email_form-item',
                required: true
            },
            description: {
                id: 'settings_description',
                formItemId: 'settings_description_form-item'
            },
            city: {
                id: 'settings_city',
                formItemId: 'settings_city_form-item'
            },
            instagram: {
                id: 'settings_instagram',
                formItemId: 'settings_instagram_form-item'
            },
            weight: {
                id: 'settings_weight',
                formItemId: 'settings_weight_form-item'
            },
            height: {
                id: 'settings_height',
                formItemId: 'settings_height_form-item'
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
            },
            birthday: {
                id: 'settings_birthday',
                formItemId: 'settings_birthday_from-item',
                required: true
            }
        },
        filter: {
            partnerHeightTop: {
                id: 'settings_partner-height-top',
                id2: 'settings_partner-height-bot',
                formItemId: 'settings_partner-height_form-item'
            },
            partnerHeightBot: {
                id: 'settings_partner-height-bot',
                formItemId: 'settings_partner-height_form-item'
            },
            partnerWeightTop: {
                id: 'settings_partner-weight-top',
                id2: 'settings_partner-weight-bot',
                formItemId: 'settings_partner-weight_form-item'
            },
            partnerWeightBot: {
                id: 'settings_partner-weight-bot',
                formItemId: 'settings_partner-weight_form-item'
            },
            partnerAgeTop: {
                id: 'settings_partner-age-top',
                id2: 'settings_partner-age-bot',
                formItemId: 'settings_partner-age_form-item'
            },
            partnerAgeBot: {
                id: 'settings_partner-age-bot',
                formItemId: 'settings_partner-age_form-item'
            }
        },
        photo: {},
        photoSecret: {},
        password: {
            passwordOld: {
                id: 'settings_password_old',
                formItemId: 'settings_password_old_form-item',
                required: true
            },
            password: {
                id: 'settings_password_new',
                formItemId: 'settings_password_new_form-item'
            },
            passwordRepeat: {
                id: 'settings_password_new_repeat',
                formItemId: 'settings_password_new_repeat_form-item',
                required: true
            }
        }
    };

    settingsList: IFormList = {};

    photoList: string[] = [];
    secretPhotoList: string[] = [];
    filter = '';
    filterButtonMain: FilterButton;
    filterButtonSecret: FilterButton;
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {SettingsController}
     */
    constructor(view?: BaseView) {
        super({ view: view || new SettingsView() });
    }

    finish(): void {
        this.deleteListeners();
        if (this.filterButtonMain) {
            this.filterButtonMain.deleteListeners();
        }
        if (this.filterButtonSecret) {
            this.filterButtonSecret.deleteListeners();
        }
    }

    onLogOut(): void {
        userModel.logout().then(() => {
            chatModel.resetChats();
            webSocketListener.stop();
            eventBus.emit(Events.resetFeed);
            eventBus.emit(Events.updateAvatar);
            eventBus.emit(Events.routeChange, Routes.loginRoute);
        });
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
                this.changeList('main');
                if (window.innerWidth < 700) {
                    this.setVisibleSettings(false);
                }
                Object.entries(this.settingsGroup).forEach(([, value]) => {
                    validateForm.call(this, value);
                });
                this.formSubmit();
                this.fillFormData();
                this.showDragPhoto('drag-photo', this.photoList, true);
                document.getElementById('input_avatar__save-button').classList.add('div_disabled');
                document.getElementById('input_avatar__save-button__secret').classList.add('div_disabled');
                document.getElementById('settings__filter-button').classList.add('div_disabled');
                document.getElementById('settings__filter-button__secret').classList.add('div_disabled');
                this.filterButtonMain = new FilterButton('settings__filter-button', (filter: string) => {
                    this.filter = filter;
                    this.photoUpload();
                });
                this.filterButtonSecret = new FilterButton(
                    'settings__filter-button__secret',
                    (filter: string) => {
                        this.filter = filter;
                        this.photoUpload('__secret');
                    }
                );

                const sessionStoragePage = <keyof ISettingsListIds>(
                    window.sessionStorage.getItem('settingsPage')
                );
                let page: keyof ISettingsListIds = 'main';
                if (this.queryParams.page in this.settingsListIds) {
                    page = this.queryParams.page;
                    this.changeList(page);
                } else if (sessionStoragePage in this.settingsListIds) {
                    page = sessionStoragePage;
                    this.changeList(page);
                }
                eventBus.emit(Events.queryChange, { queryObj: { page: page }, isNewState: false });
                window.sessionStorage.setItem('settingsPage', page);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    openPayForm(): void {
        new PopoutWrapperClass({
            children: new Pay().render(),
            showBg: true,
            block: false
        });
    }

    showDragPhoto(id: string, photoList: string[], isMainAlbum = true): void {
        const root = document.getElementById(id);

        let tmpDragObj = this.dragMainPhoto;
        if (!isMainAlbum) {
            tmpDragObj = this.dragSecretPhoto;
        }

        if (tmpDragObj) {
            tmpDragObj.deleteListeners();
        }

        tmpDragObj = new DragableListClass(
            root,
            photoList.map((item) => {
                return {
                    str: new Img({
                        src: item
                    }).render(),
                    data: {
                        photoListItem: item
                    }
                };
            }),
            (from: number, to: number) => {
                if (to === -1) {
                    photoList.splice(from, 1);
                } else {
                    arrayMove(photoList, from, to);
                }
                this.savePhotoList(photoList, isMainAlbum);
            }
        );
    }

    savePhotoList(arr: string[], isMainAlbum = true): Promise<IResponseData> {
        const photos = [
            ...arr.map((item) => {
                return item.slice(item.lastIndexOf('/') + 1);
            })
        ];
        if (!isMainAlbum) {
            return AlbumModel.updatePhotos(photos);
        } else {
            return patchUser.call(this, { photos }).then(() => {
                eventBus.emit(Events.updateAvatar);
            });
        }
    }

    fillSecretPhotos(): void {
        AlbumModel.getPhotos(userModel.getData().id).then((response) => {
            if (response.ok) {
                this.secretPhotoList = response.json.photos;
                this.showDragPhoto('drag-photo__secret', this.secretPhotoList, false);
            }
        });
    }

    /**
     * Заполняет поля формы данными пользователя
     */
    fillFormData(): void {
        const json = userModel.getFilledData();
        this.photoList = json.photos;
        this.fillSecretPhotos();

        if (json.error) {
            return;
        }
        document.querySelectorAll(':disabled').forEach((item) => {
            (<HTMLInputElement>item).disabled = false;
        });

        document.querySelectorAll('.placeholder-item').forEach((item) => {
            item.classList.remove('placeholder-item');
        });

        fillForm(json, this.settingsGroup.main);
        fillForm(json, this.settingsGroup.filter);
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
            element: document.getElementById('settings__password'),
            type: 'submit',
            listener: (e) => {
                e.preventDefault();
                this.onSubmit();
            }
        });

        this.registerListener({
            element: document.getElementById('logout'),
            type: 'click',
            listener: this.onLogOut.bind(this)
        });

        this.registerListener({
            element: document.getElementById('input_avatar'),
            type: 'change',
            listener: () => {
                this.photoUpload();
            }
        });

        this.registerListener({
            element: document.getElementById('input_avatar__button'),
            type: 'click',
            listener: () => {
                document.getElementById('input_avatar').click();
            }
        });

        this.registerListener({
            element: document.getElementById('input_avatar__secret'),
            type: 'change',
            listener: () => {
                this.photoUpload('__secret');
            }
        });

        this.registerListener({
            element: document.getElementById('input_avatar__button__secret'),
            type: 'click',
            listener: () => {
                document.getElementById('input_avatar__secret').click();
            }
        });

        this.registerListener({
            element: document.getElementById('settings__chevronBack'),
            type: 'click',
            listener: () => {
                this.setVisibleSettings(false);
            }
        });

        this.registerListener({
            element: document.getElementById('input_avatar__save-button'),
            type: 'click',
            listener: () => {
                this.uploadPhoto(this.file);
            }
        });

        this.registerListener({
            element: document.getElementById('input_avatar__save-button__secret'),
            type: 'click',
            listener: () => {
                this.uploadPhoto(this.file);
            }
        });

        this.registerListener({
            element: document.getElementById('pay-button'),
            type: 'click',
            listener: () => {
                this.openPayForm();
            }
        });

        Object.entries(this.settingsListIds).forEach(([key, value]) => {
            this.registerListener({
                element: document.getElementById(value),
                type: 'click',
                listener: () => {
                    this.changeList(<keyof ISettingsListIds>key);
                }
            });
            this.registerListener({
                element: document.getElementById(value),
                type: 'click',
                listener: () => {
                    this.updateQueryString(<keyof ISettingsListIds>key);
                }
            });
        });
    }

    photoUpload(classPostfics?: string): void {
        const file = (document.getElementById(`input_avatar${classPostfics ?? ''}`) as HTMLInputElement)
            .files[0];
        onPhotoUpload(file, this.filter).then((file) => {
            document
                .getElementById(`input_avatar__save-button${classPostfics ?? ''}`)
                .classList.remove('div_disabled');
            document
                .getElementById(`settings__filter-button${classPostfics ?? ''}`)
                .classList.remove('div_disabled');
            setPhoto(file, `settings__new-photo${classPostfics ?? ''}`, 'settings__photo');
            this.file = file;
        });
    }

    uploadPhoto(file: Context): void {
        file = file ?? this.file;
        if (file !== null) {
            userModel
                .uploadPhoto(file)
                .then((photoResponse) => {
                    document.getElementById('input_avatar__save-button').classList.add('div_disabled');
                    document
                        .getElementById('input_avatar__save-button__secret')
                        .classList.add('div_disabled');

                    this.file = null;
                    this.collapsePhoto();

                    (document.getElementById('input_avatar') as HTMLInputElement).value = null;

                    if (!photoResponse.ok) {
                        pushUploadPhotoError(photoResponse.json.error);
                        return;
                    }

                    if (this.settingsList === this.settingsGroup.photo) {
                        eventBus.emit(Events.updateAvatar);
                        this.savePhotoList(userModel.getData().photos, true).then(() => {
                            this.photoList = userModel.getData().photos;
                            this.showDragPhoto('drag-photo', this.photoList, true);
                        });
                    } else {
                        this.secretPhotoList.push(`${imageStorageLocation}/${photoResponse.json.photoId}`);
                        this.savePhotoList(this.secretPhotoList, false);
                        this.showDragPhoto('drag-photo__secret', this.secretPhotoList, false);
                    }
                })
                .catch((photoReason) => {
                    console.error('Photo upload error - ', photoReason);
                });
        }
    }

    setVisibleSettings(visibleSettings: boolean): void {
        const settingsList = document.querySelector('.settings__list');
        const settings = document.querySelector('.settings');

        settingsList.classList.add(`div-phone_${visibleSettings ? 'disabled' : 'active'}`);
        settingsList.classList.remove(`div-phone_${visibleSettings ? 'active' : 'disabled'}`);

        settings.classList.remove(`div-phone_${visibleSettings ? 'disabled' : 'active'}`);
        settings.classList.add(`div-phone_${visibleSettings ? 'active' : 'disabled'}`);

        if (!visibleSettings) {
            Object.entries(this.settingsListIds).forEach(([, value]) => {
                document.getElementById(value).classList.remove('cell_active');
            });
        }
    }

    updateQueryString(newKey: keyof ISettingsListIds): void {
        if (this.prevPage !== newKey) {
            eventBus.emit(Events.queryChange, { queryObj: { page: newKey }, isNewState: true });
            this.prevPage = newKey;
            window.sessionStorage.setItem('settingsPage', newKey);
        }
    }

    changeList(newKey: keyof ISettingsListIds): void {
        this.collapsePhoto();
        this.file = null;

        if (newKey === 'photo' || newKey === 'photoSecret') {
            document.getElementById('settings__submit').classList.add('div_disabled');
        } else {
            document.getElementById('settings__submit').classList.remove('div_disabled');
        }

        Object.entries(this.settingsListIds).forEach(([key, value]) => {
            document.getElementById(value).classList.remove('cell_active');
            if (key === newKey) {
                document.getElementById(value).classList.add('cell_active');
            }
        });
        this.settingsList = this.settingsGroup[newKey];

        Object.entries(this.settingsGroupIds).forEach(([key, value]) => {
            value.forEach((item) => {
                const currentElement = document.getElementById(item).parentElement.parentElement;
                if (key === newKey) {
                    currentElement.classList.remove('div_disabled');
                } else {
                    currentElement.classList.add('div_disabled');
                }
            });
        });

        this.setVisibleSettings(true);
    }

    collapsePhoto(): void {
        const photoForm = document.getElementById('settings__new-photo');
        const tmpDiv = document.createElement('div');
        tmpDiv.innerHTML = new FormItem({ id: 'settings__new-photo' }).render();
        photoForm.replaceWith(tmpDiv.firstChild);

        const photoFormSecret = document.getElementById('settings__new-photo__secret');
        const tmpDivSecret = document.createElement('div');
        tmpDivSecret.innerHTML = new FormItem({ id: 'settings__new-photo__secret' }).render();
        photoFormSecret.replaceWith(tmpDivSecret.firstChild);
    }

    /**
     * Валидирует поля и делает запрос на сервер
     */
    onSubmit(): void {
        this.formSuccess = checkForm.call(this, this.settingsList);
        const tmpForm: Context = {};
        Object.entries(this.settingsList).forEach((item) => {
            const [key, obj] = item;
            if ((obj.value && obj.valid) || !obj.required) {
                tmpForm[key] = obj.value;
            }
        });

        if (this.formSuccess) {
            patchUser.call(this, tmpForm);
        }
    }
}

export default SettingsController;

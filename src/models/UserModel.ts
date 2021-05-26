import HttpRequests from '../utils/requests';
import { addIfNotEq, filterObject, parseJson, IResponseData, isActive } from '../utils/helpers';
import Context from '../utils/Context';
import { imageStorageLocation, imageBackendLocation } from '../consts/config';

export interface IUserModel {
    error?: Context;
    id?: number;
    mail?: string;
    name?: string;
    birthday?: string;
    description?: string;
    city?: string;
    photos?: string[];
    instagram?: string;
    sex?: string;
    datePreference?: string;
    isActive?: boolean;
    password?: string;
    passwordRepeat?: string;
    passwordOld?: string;
    captchaToken?: string;
    age?: number;
}

class UserModel {
    static instance: UserModel = null;
    data: IUserModel = {};

    authorized: boolean = null;

    /**
     * Создает экземпляр UserModel
     *
     * @constructor
     * @this  {UserModel}
     * @param {IUserModel} builder
     */
    constructor(builder: IUserModel = {}) {
        this.data = {
            id: builder.id,
            mail: builder.mail,
            name: builder.name,
            birthday: builder.birthday,
            description: builder.description,
            city: builder.city,
            photos: builder.photos,
            instagram: builder.instagram,
            sex: builder.sex,
            datePreference: builder.datePreference,
            isActive: builder.isActive,
            password: builder.password,
            passwordRepeat: builder.passwordRepeat,
            passwordOld: builder.passwordOld
        };
    }

    static getInstance() {
        if (!UserModel.instance) {
            UserModel.instance = new UserModel();
        }

        return UserModel.instance;
    }

    set(data: Context) {
        Object.entries(data).forEach((item) => {
            const [key, value] = item as [keyof IUserModel, Context];
            if (key in this.data) {
                this.data = { ...this.data, [key]: this.setMiddleware(key, value) };
            }
        });

        return this;
    }

    receiveMiddleware(key: string, value: Context): Context {
        switch (key) {
            case 'birthday':
                return value * 1000;
            case 'photos':
                if (value) {
                    value = value.map((v: string) => imageStorageLocation + '/' + v);
                }
                return value;
            default:
                return value;
        }
    }

    setMiddleware(key: string, value: Context): Context {
        switch (key) {
            case 'birthday':
                return value / 1000;
            default:
                return value;
        }
    }

    getData(): IUserModel {
        let data = this.data;

        data.password = undefined;
        data.passwordOld = undefined;
        data.passwordRepeat = undefined;

        if (this.data.birthday !== undefined) {
            data = {
                age: Math.floor(
                    (new Date().getTime() - new Date(data.birthday).getTime()) / (1000 * 3600 * 24 * 365)
                ),
                ...data
            };
        }

        return data;
    }

    getFilledData(): IUserModel {
        return filterObject(this.getData(), (value) => {
            return value !== undefined;
        });
    }

    clearData() {
        for (const item of Object.entries(this.data)) {
            const key = item[0] as keyof IUserModel;
            delete this.data[key];
        }
    }

    /**
     * Создает пользователя
     *
     * @return {Promise}
     */
    create(): Promise<IResponseData> {
        const data = this.data;
        return HttpRequests.post('/users', data)
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    this.authorized = true;
                    Object.entries(response.json).forEach((item) => {
                        const [key, value] = item as [keyof IUserModel, Context];
                        if (key in this.data) {
                            this.data = { ...this.data, [key]: this.receiveMiddleware(key, value) };
                        }
                    });
                    response.json = this.getData();
                }

                return response;
            });
    }

    /**
     * Получает пользователя
     *
     * @return {Promise}
     */
    get(): Promise<IResponseData> {
        if (this.data.id === undefined) {
            return Promise.reject(new Error('Invalid id undefined. It shouldn\'t be -1'));
        }

        return HttpRequests.get(`/users/${this.data.id}`)
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    Object.entries(response.json).forEach((item) => {
                        const [key, value] = item as [keyof IUserModel, Context];
                        if (key in this.data) {
                            this.data = { ...this.data, [key]: this.receiveMiddleware(key, value) };
                        }
                    });
                    response.json = this.getData();
                }

                return response;
            });
    }

    /**
     * Обновляет данные пользователя
     *
     * @return {Promise}
     */
    update(data: Context): Promise<IResponseData> {
        const currData: IUserModel = this.data;

        let modifiedData: Context = {};
        Object.entries(data).forEach((item) => {
            const [key, value] = item as [keyof IUserModel, Context];
            if (key !== 'id' && key in currData) {
                modifiedData[key] = addIfNotEq(this.setMiddleware(key, value), currData[key]);
            }
        });

        modifiedData = filterObject(modifiedData, (v) => {
            return v !== undefined;
        });

        return HttpRequests.patch(`/users/${this.data.id}`, modifiedData)
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    Object.entries(response.json).forEach((item) => {
                        const [key, value] = item as [keyof IUserModel, Context];
                        if (key in this.data) {
                            this.data = { ...this.data, [key]: this.receiveMiddleware(key, value) };
                        }
                    });
                    response.json.isActive = isActive(this.data);
                    response.json = this.getData();
                }

                return response;
            });
    }

    /**
     * Производит логин для пользователя
     *
     * @return {Promise}
     */
    login(): Promise<IResponseData> {
        if (this.data.mail === undefined || this.data.password === undefined) {
            return Promise.reject(new Error('Mail or password is not provided for login'));
        }

        return HttpRequests.post('/login', {
            mail: this.data.mail,
            password: this.data.password
        })
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    this.authorized = true;
                    Object.entries(response.json).forEach((item) => {
                        const [key, value] = item as [keyof IUserModel, Context];
                        if (key in this.data) {
                            this.data = { ...this.data, [key]: this.receiveMiddleware(key, value) };
                        }
                    });
                    response.json = this.getData();
                }

                return response;
            });
    }

    /**
     * Производит выход пользователя
     *
     * @return {Promise}
     */
    logout(): Promise<IResponseData> {
        if (this.data.id === undefined) {
            return Promise.reject(new Error(`Invalid id ${this.data.id}. It shouldn't be -1`));
        }

        return HttpRequests.delete('/login', {}).then((response) => {
            window.localStorage.removeItem('scheme');
            document.body.removeAttribute('scheme');

            this.authorized = false;
            Object.entries(this.data).forEach((item) => {
                const key = item[0] as keyof IUserModel;
                this.data = { ...this.data, [key]: undefined };
            });

            window.localStorage.removeItem('CSRFToken');

            return {
                json: {},
                status: response.status,
                ok: response.ok
            };
        });
    }

    /**
     * Удаляет пользователя
     *
     * @return {Promise}
     */
    delete(): Promise<IResponseData> {
        if (this.data.id === undefined) {
            return Promise.reject(new Error(`Invalid id ${this.data.id}. It shouldn't be -1`));
        }

        return HttpRequests.delete(`/users/${this.data.id}`, {}).then((response) => {
            if (response.ok || response.status === 401) {
                this.authorized = false;
                this.clearData();
            }
            return {
                json: {},
                status: response.status,
                ok: response.ok
            };
        });
    }

    /**
     * Добавляет фотографию к профилю
     *
     * @param {String} photo - фотография
     * @return {Promise}
     */
    uploadPhoto(photo: File) {
        const options = {
            url: imageBackendLocation
        };
        return HttpRequests.postBinary('', photo, options)
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    this.data.photos.push(imageStorageLocation + '/' + response.json.photoId);
                }

                return response;
            });
    }

    /**
     * Сообщает, авторизован ли пользователь
     *
     * @return {Promise}
     */
    isAuthorized(): boolean {
        return this.authorized;
    }

    /**
     * Сообщает, активирован ли пользователь
     *
     * @return {Promise}
     */
    isActive(): boolean {
        return this.getData().isActive;
    }

    /**
     * Проверяет авторизацию пользователя
     *
     * @return {Promise}
     */
    auth(): Promise<IResponseData> {
        if (this.authorized === true) {
            return Promise.resolve({
                status: 200,
                ok: true,
                json: this.getData()
            });
        }

        if (this.authorized === false) {
            return Promise.resolve({
                status: 401,
                ok: false,
                json: {}
            });
        }

        return HttpRequests.get('/auth')
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    this.authorized = true;
                    Object.entries(response.json).forEach((item) => {
                        const [key, value] = item as [keyof IUserModel, Context];
                        if (key in this.data) {
                            this.data = { ...this.data, [key]: this.receiveMiddleware(key, value) };
                        }
                    });
                    response.json = this.getData();
                } else {
                    this.authorized = false;
                }

                return response;
            });
    }
}

export default UserModel.getInstance();

import HttpRequests from '../utils/requests';
import {
    addIfNotEq,
    filterObject,
    parseJson,
    IResponseData
} from '../utils/helpers';
import Context from '../utils/Context';

export interface IUserModel {
    id?: number;
    mail?: string;
    name?: string;
    birthday?: string;
    description?: string;
    city?: string;
    avatar?: string;
    instagram?: string;
    sex?: string;
    datePreference?: string;
    password?: string;
    passwordRepeat?: string;
    passwordOld?: string;
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
            const [key, value] = item;
            if (key in this.data) {
                this.data[key] = this.setMiddleware(key, value);
            }
        });

        return this;
    }

    receiveMiddleware(key: string, value: Context) {
        switch (key) {
        case 'birthday':
            return value * 1000;
        default:
            return value;
        }
    }

    setMiddleware(key: string, value: Context) {
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
                    (new Date().getTime() - new Date(data.birthday).getTime()) /
                        (1000 * 3600 * 24 * 365)
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
            this.data[item[0]] = undefined;
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
                    for (const [key, value] of Object.entries(response.json)) {
                        if (key in this.data) {
                            this.data[key] = this.receiveMiddleware(key, value);
                        }
                    }
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
            return Promise.reject(
                new Error(`Invalid id ${this.data.id}. It shouldn't be -1`)
            );
        }

        return HttpRequests.get(`/users/${this.data.id}`)
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    for (const [key, value] of Object.entries(response.json)) {
                        if (key in this.data) {
                            this.data[key] = this.receiveMiddleware(key, value);
                        }
                    }
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
        for (const [key, value] of Object.entries(data)) {
            if (key !== 'id' && key in currData) {
                modifiedData[key] = addIfNotEq(
                    this.setMiddleware(key, value),
                    currData[key]
                );
            }
        }

        modifiedData = filterObject(modifiedData, (v) => {
            return v !== undefined;
        });

        return HttpRequests.patch(`/users/${this.data.id}`, modifiedData)
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    for (const [key, value] of Object.entries(response.json)) {
                        if (key in this.data) {
                            this.data[key] = this.receiveMiddleware(key, value);
                        }
                    }
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
            return Promise.reject(
                new Error('Mail or password is not provided for login')
            );
        }

        return HttpRequests.post('/login', {
            mail: this.data.mail,
            password: this.data.password
        })
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    this.authorized = true;
                    for (const [key, value] of Object.entries(response.json)) {
                        if (key in this.data) {
                            this.data[key] = this.receiveMiddleware(key, value);
                        }
                    }
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
            return Promise.reject(
                new Error(`Invalid id ${this.data.id}. It shouldn't be -1`)
            );
        }

        return HttpRequests.delete('/login', {}).then((response) => {
            this.authorized = false;
            Object.entries(this.data).forEach((item) => {
                const key = item[0];
                this.data[key] = undefined;
            });

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
            return Promise.reject(
                new Error(`Invalid id ${this.data.id}. It shouldn't be -1`)
            );
        }

        return HttpRequests.delete(`/users/${this.data.id}`, {}).then(
            (response) => {
                if (response.ok || response.status === 401) {
                    this.authorized = false;
                    this.clearData();
                }
                return {
                    json: {},
                    status: response.status,
                    ok: response.ok
                };
            }
        );
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
                    for (const [key, value] of Object.entries(response.json)) {
                        if (key in this.data) {
                            this.data[key] = this.receiveMiddleware(key, value);
                        }
                    }
                    response.json = this.getData();
                } else {
                    this.authorized = false;
                }

                return response;
            });
    }
}

export default UserModel.getInstance();

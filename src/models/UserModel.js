import HttpRequests from '../utils/requests.js';
import { addIfNotEq, filterObject, parseJson } from '../utils/helpers.js';

class UserModel {
    static instance = null;

    /**
     * Создает экземпляр UserModel
     *
     * @constructor
     * @this  {UserModel}
     * @param {{
     *     id?: Number,
     *     mail?: String,
     *     name?: String,
     *     birthday?: String,
     *     description?: String,
     *     city?: String,
     *     avatar?:String,
     *     instagram?: String,
     *     sex?: String,
     *     datePreference?: String,
     *     password?: String,
     *     passwordRepeat?: String
     *     passwordOld?: String,
     * }} builder
     */
    constructor(builder = {}) {
        this.data = {
            id: builder.id,
            mail: builder.mail,
            name: builder.name,
            birthday: builder.birthday,
            description: builder.description,
            city: builder.city,
            avatar: builder.avatar,
            instagram: builder.instagram,
            sex: builder.sex,
            datePreference: builder.datePreference,
            password: builder.password,
            passwordRepeat: builder.passwordRepeat,
            passwordOld: builder.passwordOld
        };

        this.authorized = null;
    }

    static getInstance() {
        if (!UserModel.instance) {
            UserModel.instance = new UserModel();
        }

        return UserModel.instance;
    }

    set(data) {
        for (const [key, value] of Object.entries(data)) {
            if (key in this.data) {
                this.data[key] = this.setMiddleware(key, value);
            }
        }

        return this;
    }

    receiveMiddleware(key, value) {
        switch (key) {
        case 'birthday':
            return value * 1000;
        default:
            return value;
        }
    }

    setMiddleware(key, value) {
        switch (key) {
        case 'birthday':
            return value / 1000;
        default:
            return value;
        }
    }

    getData() {
        let data = this.data;

        data.password = undefined;
        data.passwordOld = undefined;
        data.passwordRepeat = undefined;

        if (this.data.birthday !== undefined) {
            data = {
                age: Math.floor((new Date() - new Date(data.birthday)) /
                    (1000 * 3600 * 24 * 365)),
                ...data
            };
        }

        console.log(this.data, data);

        return data;
    }

    getFilledData() {
        return filterObject(this.getData(), (v) => { return v !== undefined; });
    }

    /**
     * Создает пользователя
     *
     * @return {Promise}
     */
    create() {
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
    get() {
        if (this.data.id === undefined) {
            return Promise.reject(new Error(`Invalid id ${this.data.id}. It shouldn't be -1`));
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
    update(data) {
        const currData = this.data;

        let modifiedData = {};
        for (const [key, value] of Object.entries(data)) {
            if (key !== 'id' && key in currData) {
                modifiedData[key] = addIfNotEq(this.setMiddleware(key, value), currData[key]);
            }
        }

        modifiedData = filterObject(modifiedData, (v) => { return v !== undefined; });

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
    login() {
        if (this.data.mail === undefined || this.data.password === undefined) {
            return Promise.reject(new Error('Mail or password is not provided for login'));
        }

        return HttpRequests.post('/login', { mail: this.data.mail, password: this.data.password })
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
    logout() {
        if (this.data.id === undefined) {
            return Promise.reject(new Error(`Invalid id ${this.data.id}. It shouldn't be -1`));
        }

        return HttpRequests.delete('/login', {})
            .then((response) => {
                this.authorized = false;

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
    delete() {
        if (this.data.id === undefined) {
            return Promise.reject(new Error(`Invalid id ${this.data.id}. It shouldn't be -1`));
        }

        return HttpRequests.delete(`/users/${this.data.id}`, {})
            .then((response) => {
                if (response.ok || response.status === 401) {
                    this.authorized = false;
                }
                return {
                    json: {},
                    status: response.status,
                    ok: response.ok
                };
            });
    }

    /**
     * Сообщает, авторизован ли пользователь
     *
     * @return {Promise}
     */
    isAuthorized() {
        return this.authorized;
    }

    /**
     * Проверяет авторизацию пользователя
     *
     * @return {Promise}
     */
    auth() {
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

import {patchRequest, getRequest, postRequest} from '../utils/requests.js';
import {addIfNotEq, filterObject} from "../utils/helpers";

class UserModel {
    constructor(builder) {
        this.id = builder._id
        this.mail = builder._mail
        this.name = builder._name
        this.birthday = builder._birthday
        this.description = builder._description
        this.city = builder._city
        this.avatar = builder._avatar
        this.instagram = builder._instagram
        this.sex = builder._sex
        this.datePreference = builder._datePreference
    }

    toJson() {
        const rawData =  {
            'id': addIfNotEq(this.id, -1),
            'mail': addIfNotEq(this.mail, ''),
            'name': addIfNotEq(this.name, ''),
            'birthday': addIfNotEq(this.birthday, 0),
            'description': addIfNotEq(this.description, ''),
            'city': addIfNotEq(this.city, ''),
            'avatar': addIfNotEq(this.avatar, ''),
            'instagram': addIfNotEq(this.instagram, ''),
            'sex': addIfNotEq(this.sex, ''),
            'datePreference': addIfNotEq(this.datePreference, ''),
        }

        return filterObject(rawData, (v) => {return v !== undefined})
    }

    create() {
        const data = this.toJson()
        return postRequest('/users', data)
            .then(response => {
                return response.json();
            });
    }

    get(id) {
        this.id = id;

        return getRequest(`/users/${this.id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                for (const [key, value] in Object.entries(data)) {

                }
            });
    }

    update(data) {
        const currData = this.toJson()

        let modifiedData = {}
        for (const [key, value] of Object.entries(data)) {
            if (key !== 'id' && key in currData) {
                modifiedData = {
                    key: addIfNotEq(value, currData[key]),
                    ...modifiedData
                }
            }
        }

        modifiedData = filterObject(modifiedData, (v) => {return v !== undefined})

        return patchRequest(`/users/${this.id}`, modifiedData).then((response) => {
            return response.json();
        });
    }
}

export default UserModel

class UserModel {
    constructor(builder) {
        this.id = builder._id
        this.mail = builder._mail
        this.name = builder._name
        this.birthday = builder._birthday
        this.description = builder._description
        this.city = builder._city
        this.avatar = builder._avatar
        this.instagram = builder._instagram
        this.sex = builder._sex
        this.datePreference = builder._datePreference
    }

    create() {

    }
}

export default UserModel

/**
 * Отправляет данные пользователя
 *
 * @param {Object} data данные для логина
 * @param {Object} id идентификатор пользователя
 * @return {Promise}
 */
export function setUsersData(data, id) {
    return patchRequest(`/users/${id}`, data).then((response) => {
        return response.json();
    });
}

/**
 * Отправляет данные текущего пользователя
 *
 * @param {Object} data данные для логина
 * @return {Promise}
 */
export function setCurentUsersData(data) {
    const id = window.localStorage.getItem('u-id');
    return patchRequest(`/users/${id}`, data).then((response) => {
        return response.json();
    });
}

/**
 * Получить данные пользователя
 *
 * @return {Promise}
 */
export function getUsersData(id) {
    return getRequest(`/users/${id}`).then((response) => {
        return response.json();
    });
}

/**
 * Получить данные текущего пользователя
 *
 * @return {Promise}
 */
export function getCurentUsersData() {
    const id = window.localStorage.getItem('u-id');
    return getRequest(`/users/${id}`).then((response) => {
        return response.json();
    });
}

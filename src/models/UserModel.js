import { patchRequest, getRequest } from '../utils/requests.js';

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

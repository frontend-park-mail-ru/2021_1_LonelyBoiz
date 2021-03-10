import { patchRequest, getRequest } from '../utils/requests.js';

/**
 * Отправляет данные пользователя
 *
 * @param {Object} data данные для логина
 * @param {Object} id идентификатор пользователя
 * @return {Promise}
 */
export function setUsersData(data, id) {
    return patchRequest(`/user/${id}`, data).then((response) => {
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
    return patchRequest(`/user/${id}`, data).then((response) => {
        return response.json();
    });
}

/**
 * Получить данные пользователя
 *
 * @return {Promise}
 */
export function getUsersData(id) {
    return getRequest(`/user/${id}`).then((response) => {
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
    return getRequest(`/user/${id}`).then((response) => {
        return response.json();
    });
}

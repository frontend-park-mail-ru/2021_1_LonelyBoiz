import { postRequest, getRequest } from '../utils/requests.js';

/**
 * Отправляет данные для входа
 *
 * @param {Object} data данные для логина
 * @return {Promise}
 */
export function sendLoginData(data) {
    return postRequest('/login', data)
        .then((response) => {
            return response.json();
        });
}

/**
 * Отправляет данные для регистрации
 *
 * @param {Object} data данные для регистрации
 * @return {Promise}
 */
export function sendSignUpData(data) {
    return postRequest('/users', data)
        .then((response) => {
            return response.json();
        });
}
/**
 * Отправляет запрос проверки авторизации
 *
 * @return {Promise}
 */
export function getAuth() {
    return getRequest('/auth');
}

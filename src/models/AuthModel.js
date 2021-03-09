import { postRequest } from '../utils/requests.js';

/**
 * Отправляет данные для входа
 *
 * @param {Object} data данные для логина
 * @return {Promise}
 */
export function sendLoginData(data) {
    return postRequest('/login', data)
        .then(response => {
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
    return postRequest('/signup', data)
        .then(response => {
            return response.json();
        });
}

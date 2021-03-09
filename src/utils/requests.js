import backendLocation from '../consts/config.js';

/**
 * Выполняет fetch запрос
 *
 * @param {string} method указание метода HTTP запроса
 * @param {string} route указание пути принимающей стороне
 * @param {Object} body тело запроса
 * @return {Promise}
 */
export function request(method = 'GET', route = '/', body = null) {
    const options = {
        method: method,
        mode: 'cors',
        credentials: 'include'
    };

    if (body) {
        options.headers = {
            'Content-type': 'application/json'
        };
        options.body = JSON.stringify(body);
    }

    return fetch(backendLocation + route, options);
}

/**
 * Выполняет post запрос
 *
 * @param {string} route указание пути принимающей стороне
 * @param {Object} body тело запроса
 * @return {Promise}
 */
export function postRequest(route, body) {
    return request('POST', route, body);
}

/**
 * Выполняет get запрос
 *
 * @param {string} route указание пути принимающей стороне
 * @param {Object} body тело запроса
 * @return {Promise}
 */
export function getRequest(route) {
    return request('GET', route);
}

/**
 * Выполняет put запрос
 *
 * @param {string} route указание пути принимающей стороне
 * @param {Object} body тело запроса
 * @return {Promise}
 */
export function putRequest(route, body) {
    return request('PUT', route, body);
}

/**
 * Выполняет patch запрос
 *
 * @param {string} route указание пути принимающей стороне
 * @param {Object} body тело запроса
 * @return {Promise}
 */
export function patchRequest(route, body) {
    return request('PATCH', route, body);
}

/**
 * Выполняет delete запрос
 *
 * @param {string} route указание пути принимающей стороне
 * @param {Object} body тело запроса
 * @return {Promise}
 */
export function deleteRequest(route, body) {
    return request('DELETE', route, body);
}

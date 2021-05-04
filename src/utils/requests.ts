import backendLocation from '../consts/config';
import Context from './Context';

/**
 * @class
 * Базовый класс, описывающий общий случай запроса на сервер
 */
class BaseRequest {
    /**
     * Выполняет fetch запрос
     *
     * @param {string} method указание метода HTTP запроса
     * @param {string} route указание пути принимающей стороне
     * @param {any} body тело запроса
     * @param {boolean} binary является ли запрос бинарным
     * @return {Promise}
     */
    request(method = 'GET', route = '/', body: Context = null, binary?: boolean): Promise<Response> {
        const options: RequestInit = {
            method: method,
            mode: 'cors',
            credentials: 'include'
        };

        const CSRFToken = window.localStorage.getItem('CSRFToken');
        if (body && !binary) {
            options.headers = {
                'Content-type': 'application/json',
                'X-CSRF-Token': CSRFToken || ''
            };
            options.body = JSON.stringify(body);
        } else {
            options.headers = {
                'Content-type': 'multipart/form-data',
                'X-CSRF-Token': CSRFToken || ''
            };
            options.body = body;
        }

        return fetch(backendLocation + route, options).then((response) => {
            if (response.headers.get('X-CSRF-Token')) {
                window.localStorage.setItem('CSRFToken', response.headers.get('X-CSRF-Token'));
            }
            return response;
        });
    }

    makeRequest(route = 'POST', body: Context = null, binary?: boolean): Promise<Response> {
        return this.request(route, route, body, binary);
    }
}

/**
 * @class
 * Класс, выполняющий логику POST запроса
 */
class PostRequest extends BaseRequest {
    /**
     * Выполняет post запрос
     *
     * @param {string} route указание пути принимающей стороне
     * @param {Object} body тело запроса
     * @return {Promise}
     */
    makeRequest(route: string, body: Context): Promise<Response> {
        return this.request('POST', route, body);
    }
}

/**
 * @class
 * Класс, выполняющий логику GET запроса
 */
class GetRequest extends BaseRequest {
    /**
     * Выполняет get запрос
     *
     * @param {string} route указание пути принимающей стороне
     * @param {Object} body пустой объект
     * @return {Promise}
     */
    makeRequest(route: string): Promise<Response> {
        return this.request('GET', route);
    }
}

/**
 * @class
 * Класс, выполняющий логику PUT запроса
 */
class PutRequest extends BaseRequest {
    /**
     * Выполняет put запрос
     *
     * @param {string} route указание пути принимающей стороне
     * @param {Object} body тело запроса
     * @return {Promise}
     */
    makeRequest(route: string, body: Context): Promise<Response> {
        return this.request('PUT', route, body);
    }
}

/**
 * @class
 * Класс, выполняющий логику PATCH запроса
 */
class PatchRequest extends BaseRequest {
    /**
     * Выполняет patch запрос
     *
     * @param {string} route указание пути принимающей стороне
     * @param {Object} body тело запроса
     * @return {Promise}
     */
    makeRequest(route: string, body: Context): Promise<Response> {
        return this.request('PATCH', route, body);
    }
}

/**
 * @class
 * Класс, выполняющий логику DELETE запроса
 */
class DeleteRequest extends BaseRequest {
    /**
     * Выполняет delete запрос
     *
     * @param {string} route указание пути принимающей стороне
     * @param {Object} body тело запроса
     * @return {Promise}
     */
    makeRequest(route: string, body: Context): Promise<Response> {
        return this.request('DELETE', route, body);
    }
}

/**
 * @class
 * Класс, выполняющий логику POST запроса с бинарными данными
 */
class BinaryPostRequest extends BaseRequest {
    /**
     * Выполняет POST запрос с бинарными данными в теле
     *
     * @param {string} route указание пути принимающей стороне
     * @param {Object} body тело запроса
     * @return {Promise}
     */
    makeRequest(route: string, body: Context): Promise<Response> {
        return this.request('POST', route, body, true);
    }
}

/**
 * @class
 * Класс, ответственный за HTTP запросы. Выполняет нужный запрос
 */
class HttpRequests {
    static instance: HttpRequests = null;
    requests: Context;

    constructor() {
        this.requests = {
            get: new GetRequest(),
            post: new PostRequest(),
            put: new PutRequest(),
            patch: new PatchRequest(),
            delete: new DeleteRequest(),
            binary: new BinaryPostRequest()
        };
    }

    /**
     * Выдает экземпляр синглтона. В случае отсутствия - создает
     *
     * @return {HttpRequests} экземпляр объекта
     */
    static getInstance(): HttpRequests {
        if (!HttpRequests.instance) {
            HttpRequests.instance = new HttpRequests();
        }

        return HttpRequests.instance;
    }

    /**
     * Alias для makeRequest для GET запроса
     *
     * @param {string} route указание пути на принимающей стороне
     * @return {Promise} Ответ на запрос
     */
    get(route: string): Promise<Response> {
        return this.makeRequest('get', route);
    }

    /**
     * Alias для makeRequest для POST запроса
     *
     * @param {string} route указание пути на принимающей стороне
     * @param {object} body указание пути принимающей стороне
     * @return {Promise} Ответ на запрос
     */
    post(route: string, body: Context): Promise<Response> {
        return this.makeRequest('post', route, body);
    }

    /**
     * Alias для makeRequest для PUT запроса
     *
     * @param {string} route указание пути на принимающей стороне
     * @param {object} body указание пути принимающей стороне
     * @return {Promise} Ответ на запрос
     */
    put(route: string, body: Context): Promise<Response> {
        return this.makeRequest('put', route, body);
    }

    /**
     * Alias для makeRequest для PATCH запроса
     *
     * @param {string} route указание пути на принимающей стороне
     * @param {object} body указание пути принимающей стороне
     * @return {Promise} Ответ на запрос
     */
    patch(route: string, body: Context): Promise<Response> {
        return this.makeRequest('patch', route, body);
    }

    /**
     * Alias для makeRequest для DELETE запроса
     *
     * @param {string} route указание пути на принимающей стороне
     * @param {object} body указание пути принимающей стороне
     * @return {Promise} Ответ на запрос
     */
    delete(route: string, body: Context): Promise<Response> {
        return this.makeRequest('delete', route, body);
    }

    postBinary(route: string, body: Context): Promise<Response> {
        return this.makeRequest('binary', route, body);
    }

    /**
     * Выполняет запрос
     *
     * @param {string} method указание HTTP метода для передачи данных
     * @param {string} route указание пути на принимающей стороне
     * @param {object} body указание пути принимающей стороне
     * @return {Promise} Ответ на запрос
     */
    makeRequest(method: string, route: string, body: Context = null): Promise<Response> {
        if (!(method in this.requests)) {
            return Promise.reject(new Error(`Request method ${method} does not exist`));
        }

        for (const [kMethod, handler] of Object.entries(this.requests)) {
            const req = <BaseRequest>handler;
            if (kMethod === method) {
                return req.makeRequest(route, body);
            }
        }
    }
}

export default HttpRequests.getInstance();

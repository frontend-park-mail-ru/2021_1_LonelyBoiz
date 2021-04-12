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
     * @return {Promise}
     */
    request(
        method = 'GET',
        route = '/',
        body: Context = null
    ): Promise<Response> {
        const options: RequestInit = {
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

    makeRequest(route = 'POST', body: Context = null): Promise<Response> {
        return this.request(route, route, body);
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
            delete: new DeleteRequest()
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

    /**
     * Выполняет запрос
     *
     * @param {string} method указание HTTP метода для передачи данных
     * @param {string} route указание пути на принимающей стороне
     * @param {object} body указание пути принимающей стороне
     * @return {Promise} Ответ на запрос
     */
    makeRequest(
        method: string,
        route: string,
        body: Context = null
    ): Promise<Response> {
        if (!(method in this.requests)) {
            return Promise.reject(
                new Error(`Request method ${method} does not exist`)
            );
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

import HttpRequests from './requests.js';
import backendLocation from '../consts/config.js';

export function addIfNotEq(field, condition) {
    return field !== condition ? field : undefined;
}

export function filterObject(obj, condition) {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
        if (condition(value)) {
            result[key] = value;
        }
    }

    return result;
}

export function parseJson(response) {
    return response.json().then(json => {
        return {
            status: response.status,
            ok: response.ok,
            json
        };
    });
}

export function getAllUsers(response) {
    const userPromises = [];
    for (const uid in response.json) {
        userPromises.push(HttpRequests.get('/users/' + uid)
            .then(parseJson)
            .then(response => {
                response.json.photos.forEach((v) => {
                    v = backendLocation + '/images/' + v;
                });
                return {
                    status: response.status,
                    ok: response.ok,
                    json: response.json
                };
            })
        );
    }

    return Promise.all(userPromises)
        .then(users => {
            return {
                status: response.status,
                ok: response.ok,
                json: users
            };
        });
}

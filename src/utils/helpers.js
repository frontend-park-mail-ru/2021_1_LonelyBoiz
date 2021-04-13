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
    if (!response.ok) {
        return response;
    }
    if (!response.json) {
        return {
            status: response.status,
            ok: response.ok,
            json: []
        };
    }
    const userPromises = [];
    response.json.forEach(uid => {
        userPromises.push(HttpRequests.get('/users/' + uid)
            .then(parseJson)
            .then(userResponse => {
                userResponse.json.photos = userResponse.json.photos.map(v => backendLocation + '/images/' + v);
                return {
                    status: userResponse.status,
                    ok: userResponse.ok,
                    json: userResponse.json
                };
            })
        );
    });

    return Promise.all(userPromises)
        .then(users => {
            return {
                status: response.status,
                ok: response.ok,
                json: users
            };
        });
}

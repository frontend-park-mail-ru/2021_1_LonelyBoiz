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

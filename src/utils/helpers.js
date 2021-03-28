export function addIfNotEq(field, condition) {
    return field !== condition ? field : undefined;
}

export function filterObject(obj, condition) {
    let result = {}

    for (const [key, value] of Object.entries(obj)) {
        if (condition(value)) {
            result[key] = value
        }
    }

    return result
}

import Context from './Context';

export interface IResponseData {
    status: number;
    ok: boolean;
    json: Context;
}

export function addIfNotEq(field: Context, condition: Context): Context {
    return field !== condition ? field : undefined;
}

export function filterObject(obj: Context, condition: (value: Context) => boolean): Context {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
        if (condition(value)) {
            result[key] = value;
        }
    }

    return result;
}

export function parseJson(response: Response): Promise<IResponseData> {
    return response.json().then((json) => {
        return {
            status: response.status,
            ok: response.ok,
            json
        };
    });
}

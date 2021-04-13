import Context from './Context';

const getKeyByValue = (object: Context, value: Context): string => {
    return Object.keys(object).find((key) => object[key] === value);
};

export default getKeyByValue;

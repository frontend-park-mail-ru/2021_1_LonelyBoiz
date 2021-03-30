import {
    validateMail,
    validatePassword,
    validateName,
    validateBirthday,
    validatePasswordRepeat,
    validateSex,
    validateDatePreference,
    validatePasswordOld
} from './validation.js';
import ValidationsErrors from '../consts/validationsErrors.js';
import { formItemSetParams } from './formItem.js';
import { getDateById, setDateById } from './dateUtil.js';
import getKeyByValue from './getKeyByValue.js';
import { datePreferenceEnum, sexEnum } from '../consts/sexEnum.js';
import eventBus from '../utils/eventBus.js';
import Events from '../consts/events.js';

const validationFuncs = {
    name: {
        validationeFunc: validateName,
        errorStatus: ValidationsErrors.name
    },
    mail: {
        validationeFunc: validateMail,
        errorStatus: ValidationsErrors.mail
    },
    sex: {
        validationeFunc: validateSex,
        errorStatus: ValidationsErrors.required
    },
    datePreference: {
        validationeFunc: validateDatePreference,
        errorStatus: ValidationsErrors.required
    },
    passwordOld: {
        validationeFunc: validatePasswordOld,
        errorStatus: ValidationsErrors.required
    },
    password: {
        validationeFunc: validatePassword,
        errorStatus: ValidationsErrors.password
    },
    passwordRepeat: {
        validationeFunc: validatePasswordRepeat,
        errorStatus: ValidationsErrors.passwordRepeat,
        defaultStatus: ValidationsErrors.password
    },
    birthday: {
        validationeFunc: validateBirthday,
        errorStatus: ValidationsErrors.birthday
    }
};

/**
 * Проверяет значение в форме и отображает успешность в интерфейсе
 * @param {{ id: String, id2?: String, formItemId?: String, validateFunction?: Function, errorMessage?: String, defaultMessage?: String, required?: Boolean, key?: String }} param0
 * @returns {{ valid: Boolean, value: String }}
 */
const validateItem = ({
    id,
    id2 = undefined,
    formItemId = null,
    validateFunction,
    errorMessage = '',
    defaultMessage = '',
    required = false,
    key = null
}) => {
    let valid = false;
    let resultValue = null;

    const domElem = document.getElementById(id);
    if (!domElem) {
        console.error('Задан несуществующий DOM элемент');
        return { valid, value: resultValue };
    }
    switch (key) {
    case 'birthday':
        resultValue = getDateById(id);
        break;

    default:
        resultValue = domElem.value;
        break;
    }

    if (id2) {
        const domElem2 = document.getElementById(id2);
        if (!domElem2) {
            console.error('Задан несуществующий DOM элемент');
            return { valid, value: resultValue };
        }
        const value2 = domElem2.value;
        valid =
            validateFunction(resultValue, value2) ||
            (!required && resultValue.length === 0);
    } else {
        valid =
            validateFunction(resultValue) ||
            (!required && resultValue.length === 0);
    }

    if (formItemId) {
        const formItemDom = document.getElementById(formItemId);
        if (!formItemDom) {
            console.error('Задан несуществующий DOM элемент');
        } else {
            if (!valid) {
                formItemSetParams({
                    element: formItemDom,
                    newStatus: 'error',
                    newBottom: errorMessage
                });
            } else {
                formItemSetParams({
                    element: formItemDom,
                    newStatus: 'valid',
                    newBottom: defaultMessage
                });
            }
        }
    }
    return { valid, value: resultValue };
};

/**
 * Проверяет значение поля формы, записывает его в исходный массив
 * @param {{ item:[String, Object], formList:Object[] }} param0
 * @returns {Boolean}
 */
function validItem({ item, formList }) {
    let success = true;
    const [key, obj] = item;
    if (validationFuncs[key] && validationFuncs[key].validationeFunc) {
        const required = obj.required || false;
        const params = {
            id: obj.id,
            formItemId: obj.formItemId,
            validateFunction: validationFuncs[key].validationeFunc,
            errorMessage: validationFuncs[key].errorStatus,
            defaultMessage: validationFuncs[key].defaultStatus || '',
            required: required,
            key: key
        };
        let validResult = {};
        switch (key) {
        case 'passwordRepeat':
        case 'passwordOld':
            validResult = validateItem({
                ...params,
                id2: formList.password.id
            });
            break;

        default:
            validResult = validateItem(params);
            break;
        }

        formList[key].valid = validResult.valid;

        if (!validResult.valid) {
            success = false;
        }
        if (validResult.value !== null && validResult.value !== undefined) {
            switch (key) {
            case 'birthday':
                formList[key].value = validResult.value.getTime() / 1000;
                break;
            case 'sex':
                formList[key].value = getKeyByValue(
                    sexEnum,
                    Number(validResult.value)
                );
                break;
            case 'datePreference':
                formList[key].value = getKeyByValue(
                    datePreferenceEnum,
                    Number(validResult.value)
                );
                break;

            default:
                formList[key].value = validResult.value;
                break;
            }
        }
    } else {
        formList[key].value = document.getElementById(obj.id).value;
    }
    return success;
}

/**
 * Подписывает на изменения полей формы (владицаия, изменение значений)
 * @param {Object[]} formList
 */
export function validateForm(formList) {
    Object.entries(formList).forEach((item, i) => {
        const [, obj] = item;
        this.registerListener({
            element: document.getElementById(obj.id),
            type: 'change',
            listener: (e) => {
                validItem({ item, formList });
            }
        });
    });
}

/**
 * Проверяет форму
 * @param {Object[]} formList
 * @returns {Boolean}
 */
export function registreForm(formList) {
    let success = true;
    Object.entries(formList).forEach((item, i) => {
        if (validItem({ item, formList }) === false) {
            success = false;
        }
    });
    return success;
}

/**
 * Добавляет описание ошибки полям формы и под форму
 * @param {String} description
 * @param {Object[]} formList
 */
export const errorDescriptionForm = (description, formList) => {
    Object.entries(description).forEach((item) => {
        const [key, value] = item;
        if (key in formList && formList[key].formItemId) {
            formItemSetParams({
                element: document.getElementById(formList[key].formItemId),
                newStatus: 'error',
                newBottom: value
            });
        }
    });
};

/**
 * Обрабатывает запрос формы
 * @param {{ data: Object, errorBlockId: String, formList: Object[] }} context * @returns
 */
export const processingResultForms = ({
    data,
    errorBlockId = null,
    formList
}) => {
    return new Promise((resolve, reject) => {
        console.log('Success', data);

        let errorBlock = null;
        if (errorBlockId) {
            errorBlock = document.getElementById(errorBlockId);
            if (errorBlock) {
                errorBlock.innerHTML = '';
            }
        }

        if (data.error) {
            if (errorBlock) {
                errorBlock.innerHTML = data.error;
            }
            if (data.description) {
                errorDescriptionForm(data.description, formList);
            }
            console.error(data);
            eventBus.emit(Events.formError, { text: data.error });
            reject(data);
        } else {
            resolve(data);
        }
    });
};

/**
 * Заполнить форму по данным
 * @param {Object} data
 * @param {Object[]} formList
 */
export const fillForm = (data, formList) => {
    Object.entries(data).forEach((item, i) => {
        const [key, value] = item;
        switch (key) {
        case 'sex':
            document.getElementById(formList[key].id).value =
                    sexEnum[value];
            break;
        case 'datePreference':
            document.getElementById(formList[key].id).value =
                    datePreferenceEnum[value];
            break;
        case 'birthday':
            setDateById(
                formList[key].id,
                new Date(Number(value) * 1000)
            );
            break;

        default:
            if (formList[key]) {
                document.getElementById(
                    formList[key].id
                ).value = value;
            }
            break;
        }
    });
};

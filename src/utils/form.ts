import {
    validateMail,
    validatePassword,
    validateName,
    validateBirthday,
    validatePasswordRepeat,
    validateSex,
    validateDatePreference,
    validatePasswordOld
} from './validation';
import ValidationsErrors from '../consts/validationsErrors';
import { formItemSetParams } from './formItem';
import { getDateById, setDateById } from './dateUtil';
import getKeyByValue from './getKeyByValue';
import { datePreferenceEnum, sexEnum } from '../consts/sexEnum';
import eventBus from '../utils/eventBus';
import Events from '../consts/events';
import Context from './Context';

export interface IFormListItem {
    id: string;
    formItemId: string;
    required?: boolean;
    value?: Context;
    valid?: boolean;
}

export interface IFormList {
    [key: string]: IFormListItem;
}

interface IValidationFunc {
    validationeFunc: Function;
    errorStatus?: string;
    defaultStatus?: string;
}

interface IValidationFuncs {
    [key: string]: IValidationFunc;
}

export const validationFuncs: IValidationFuncs = {
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

interface IValidateItem {
    id: string;
    id2?: string;
    formItemId?: string;
    validateFunction?: Function;
    errorMessage?: string;
    defaultMessage?: string;
    required?: boolean;
    key?: string;
}

interface IValidateItemReturn {
    valid: boolean;
    value: Context;
}

/**
 * Проверяет значение в форме и отображает успешность в интерфейсе
 * @param {IValidateItem} param0
 * @returns {IValidateItemReturn}
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
}: IValidateItem): IValidateItemReturn => {
    let valid = false;
    let resultValue = null;

    const domElem = <HTMLInputElement>document.getElementById(id);
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
        const domElem2 = <HTMLInputElement>document.getElementById(id2);
        if (!domElem2) {
            console.error('Задан несуществующий DOM элемент');
            return { valid, value: resultValue };
        }
        const value2 = domElem2.value;
        valid =
            validateFunction(resultValue, value2) ||
            (!required && (<string>resultValue).length === 0);
    } else {
        valid =
            validateFunction(resultValue) ||
            (!required && (<string>resultValue).length === 0);
    }

    if (formItemId) {
        const formItemDom = <HTMLElement>document.getElementById(formItemId);
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

interface IValidItem {
    item: [string, Context];
    formList: IFormList;
}

/**
 * Проверяет значение поля формы, записывает его в исходный массив
 * @param {IValidItem} param
 * @returns {Boolean}
 */
function validItem({ item, formList }: IValidItem): boolean {
    let success = true;
    const key = <keyof IValidationFuncs>item[0];
    const obj = item[1];

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
        let validResult: IValidateItemReturn;
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

        (<IValidateItemReturn>formList[key]).valid = validResult.valid;

        if (!(<IValidateItemReturn>validResult).valid) {
            success = false;
        }
        if (validResult.value !== null && validResult.value !== undefined) {
            switch (key) {
            case 'birthday':
                formList[key].value = new Date(validResult.value).getTime();
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
        formList[key].value = (<HTMLInputElement>(
            document.getElementById(obj.id)
        )).value;
    }
    return success;
}

/**
 * Подписывает на изменения полей формы (владицаия, изменение значений)
 * @param {IFormList} formList
 */
export function validateForm(formList: IFormList): void {
    Object.entries(formList).forEach((item) => {
        const [, obj] = item;
        this.registerListener({
            element: document.getElementById(obj.id),
            type: 'change',
            listener: () => {
                validItem({ item, formList });
            }
        });
    });
}

/**
 * Проверяет форму
 * @param {IFormList} formList
 * @returns {Boolean}
 */
export function checkForm(formList: IFormList): boolean {
    let success = true;
    Object.entries(formList).forEach((item) => {
        if (validItem({ item, formList }) === false) {
            success = false;
        }
    });
    return success;
}

/**
 * Добавляет описание ошибки полям формы и под форму
 * @param {Context} description
 * @param {IFormList} formList
 */
export const errorDescriptionForm = (
    description: Context,
    formList: IFormList
): void => {
    Object.entries(description).forEach((item) => {
        const [key, value] = item;
        if (key in formList && formList[key].formItemId) {
            formItemSetParams({
                element: document.getElementById(formList[key].formItemId),
                newStatus: 'error',
                newBottom: String(value)
            });
        }
    });
};

interface IProcessingResultForms {
    data: Context;
    errorBlockId?: string;
    formList: IFormList;
}

/**
 * Обрабатывает запрос формы
 * @param {IProcessingResultForms} context
 * @returns {Promise<Context>}
 */
export const processingResultForms = ({
    data,
    errorBlockId = null,
    formList
}: IProcessingResultForms): Promise<Context> => {
    return new Promise((resolve, reject) => {
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
 * @param {Console} data
 * @param {IFormList} formList
 */
export const fillForm = (data: Context, formList: IFormList): void => {
    Object.entries(data).forEach((item) => {
        const [key, value] = item;
        switch (key) {
        case 'sex':
            (<HTMLInputElement>(
                    document.getElementById(formList[key].id)
                )).value = sexEnum[String(value)];
            break;
        case 'datePreference':
            (<HTMLInputElement>(
                    document.getElementById(formList[key].id)
                )).value = datePreferenceEnum[String(value)];
            break;
        case 'birthday':
            setDateById(formList[key].id, new Date(Number(value)));
            break;

        default:
            if (formList[key]) {
                (<HTMLInputElement>(
                        document.getElementById(formList[key].id)
                    )).value = String(value);
            }
            break;
        }
    });
};

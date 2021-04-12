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
import { getDateById } from './dateUtil';
import getKeyByValue from './getKeyByValue';
import { sexEnum, datePreferenceEnum } from '../consts/sexEnum';
import Context from '../utils/Context';

export const validateFormMail = (
    id: string,
    formItemId: string
): { valid: boolean; value: Context } => {
    const mail = (<HTMLInputElement>(
        (<HTMLInputElement>document.getElementById(id))
    )).value;
    const valid = validateMail(mail);

    if (!valid) {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'error',
            newBottom: ValidationsErrors.mail
        });
    } else {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'valid',
            newBottom: ''
        });
    }
    return { valid: valid, value: mail };
};

export const validateFormName = (
    id: string,
    formItemId: string
): { valid: boolean; value: Context } => {
    const name = (<HTMLInputElement>document.getElementById(id)).value;
    const valid = validateName(name);

    if (!valid) {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'error',
            newBottom: ValidationsErrors.name
        });
    } else {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'valid',
            newBottom: ''
        });
    }
    return { valid: valid, value: name };
};

export const validateFormBirthday = (
    id: string,
    formItemId: string
): { valid: boolean; value: Context } => {
    const date = getDateById(id);
    const valid = validateBirthday(date);

    if (!valid) {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'error',
            newBottom: ValidationsErrors.birthday
        });
    } else {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'valid',
            newBottom: ''
        });
    }
    return { valid: valid, value: date };
};

export const validateFormPassword = (
    id: string,
    formItemId: string,
    required: boolean
): { valid: boolean; value: Context } => {
    const pass = (<HTMLInputElement>document.getElementById(id)).value;
    const valid = validatePassword(pass) || (!required && pass.length === 0);

    if (!valid) {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'error',
            newBottom: ValidationsErrors.password
        });
    } else {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'valid',
            newBottom: ''
        });
    }
    return { valid: valid, value: pass.length > 0 ? pass : null };
};

export const validateFormPasswordOld = (
    idPassOld: string,
    idPassNew: string,
    formItemId: string
): { valid: boolean; value: Context } => {
    const passOld = (<HTMLInputElement>document.getElementById(idPassOld))
        .value;
    const passNew = (<HTMLInputElement>document.getElementById(idPassNew))
        .value;
    const valid = validatePasswordOld(passNew, passOld);

    if (!valid) {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'error',
            newBottom: ValidationsErrors.required
        });
    } else {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'valid',
            newBottom: ''
        });
    }
    return { valid: valid, value: passOld.length > 0 ? passOld : null };
};

export const validateFormPasswordRepeat = (
    idPass1: string,
    idPass2: string,
    formItemId: string,
    required: boolean
): { valid: boolean; value: Context } => {
    const pass1 = (<HTMLInputElement>document.getElementById(idPass1)).value;
    const pass2 = (<HTMLInputElement>document.getElementById(idPass2)).value;
    const valid =
        validatePasswordRepeat(pass1, pass2) ||
        (!required && pass1.length === 0);

    if (!valid) {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'error',
            newBottom: ValidationsErrors.passwordRepeat
        });
    } else {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'valid',
            newBottom: ValidationsErrors.password
        });
    }
    return { valid: valid, value: pass2.length > 0 ? pass2 : null };
};

export const validateFormSex = (
    id: string,
    formItemId: string
): { valid: boolean; value: Context } => {
    const sex = (<HTMLInputElement>document.getElementById(id)).value;
    const valid = validateSex(sex);

    if (!valid) {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'error',
            newBottom: ValidationsErrors.required
        });
    } else {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'valid',
            newBottom: ''
        });
    }
    return { valid: valid, value: getKeyByValue(sexEnum, parseInt(sex)) };
};

export const validateFormDatePreference = (
    id: string,
    formItemId: string
): { valid: boolean; value: Context } => {
    const datePreference = (<HTMLInputElement>document.getElementById(id))
        .value;
    const valid = validateDatePreference(datePreference);

    if (!valid) {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'error',
            newBottom: ValidationsErrors.required
        });
    } else {
        formItemSetParams({
            element: document.getElementById(formItemId),
            newStatus: 'valid',
            newBottom: ''
        });
    }
    return {
        valid: valid,
        value: getKeyByValue(datePreferenceEnum, parseInt(datePreference))
    };
};

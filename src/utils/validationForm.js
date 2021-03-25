import {
    validateMail,
    validatePassword,
    validateName,
    validateBirthday,
    validatePasswordRepeat
} from './validation.js';
import ValidationsErrors from '../consts/validationsErrors.js';
import { formItemSetParams } from './formItem.js';
import { getDateById } from './dateUtil.js';
import { getKeyByValue } from './getKeyByValue.js';
import { sexEnum, datePreferenceEnum } from '../consts/sexEnum.js';

export function validateFormMail(id, formItemId) {
    const mail = document.getElementById(id).value;
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
}

export function validateFormName(id, formItemId) {
    const name = document.getElementById(id).value;
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
}

export function validateFormBirthday(id, formItemId) {
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
}

export function validateFormPassword(id, formItemId, required) {
    const pass = document.getElementById(id).value;
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
}

export function validateFormPasswordOld(idPassOld, idPassNew, formItemId) {
    const passOld = document.getElementById(idPassOld).value;
    const passNew = document.getElementById(idPassNew).value;
    const valid = passOld.length > 0 || passNew.length === 0;

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
}

export function validateFormPasswordRepeat(
    idPass1,
    idPass2,
    formItemId,
    required
) {
    const pass1 = document.getElementById(idPass1).value;
    const pass2 = document.getElementById(idPass2).value;
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
            newBottom: ''
        });
    }
    return { valid: valid, value: pass2.length > 0 ? pass2 : null };
}

export function validateFormSex(id, formItemId) {
    const sex = document.getElementById(id).value;
    const valid = sex.length > 0;

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
}

export function validateFormDatePreference(id, formItemId) {
    const datePreference = document.getElementById(id).value;
    const valid = datePreference.length > 0;

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
}

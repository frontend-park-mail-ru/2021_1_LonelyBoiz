import { sexEnum, datePreferenceEnum } from '../consts/sexEnum';
import getKeyByValue from './getKeyByValue';
/**
 * Валидирует почту
 *
 * @param {string} mail строка почты для валидации
 * @return {boolean} Истина, если прошла валидацию
 */
export function validateMail(mail: string): boolean {
    if (mail.length > 255) {
        return false;
    }

    const re = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.exec(mail) !== null;
}

/**
 * Валидирует пароль
 *
 * @param {string} pass строка пароля для валидации
 * @return {boolean} Истина, если прошла валидация
 */
export function validatePassword(pass: string): boolean {
    if (pass.length > 64 || pass.length < 8) {
        return false;
    }
    return true;
}

/**
 * Валидирует имя
 *
 * @param {string} name строка пароля для валидации
 * @return {boolean} Истина, если прошла валидация
 */
export function validateName(name: string): boolean {
    if (name.length > 64) {
        return false;
    }

    const re = /^([a-zA-Zа-яА-Яё]+)$/g;
    return re.exec(name) !== null;
}

/**
 * Валидирует имя
 *
 * @param {Date} birthday строка пароля для валидации
 * @return {boolean} Истина, если прошла валидация
 */
export function validateBirthday(birthday: Date): boolean {
    const maxBirthDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 18)
    );

    return birthday < maxBirthDate;
}

/**
 * Валидирует повторный ввод пароля
 *
 * @param {string} pass1 строка первого пароля для валидации
 * @param {string} pass2 строка второго пароля для валидации
 * @return {boolean} Истина, если прошла валидация
 */
export function validatePasswordRepeat(pass1: string, pass2: string): boolean {
    return pass1 === pass2;
}

/**
 * Валидирует ввод старого пароля
 *
 * @param {string} passNew строка первого пароля для валидации
 * @param {string} passOld строка старого пароля для валидации
 * @return {boolean} Истина, если прошла валидация
 */
export function validatePasswordOld(passOld: string, passNew: string): boolean {
    return passOld.length > 0 || passNew.length === 0;
}

/**
 * Валидирует ввод пола
 *
 * @param {string} sex строка пола
 * @return {boolean} Истина, если прошла валидация
 */
export function validateSex(sex: string): boolean {
    return (
        sex in sexEnum || getKeyByValue(sexEnum, parseInt(sex)) !== undefined
    );
}

/**
 * Валидирует ввод пола партнера
 *
 * @param {string} sex строка пола
 * @return {boolean} Истина, если прошла валидация
 */
export function validateDatePreference(sex: string): boolean {
    return (
        sex in datePreferenceEnum ||
        getKeyByValue(datePreferenceEnum, parseInt(sex)) !== undefined
    );
}

import { sexEnum, datePreferenceEnum } from '../consts/sexEnum.js';
import getKeyByValue from './getKeyByValue.js';
/**
 * Валидирует почту
 *
 * @param {String} mail строка почты для валидации
 * @return {Boolean} Истина, если прошла валидацию
 */
export function validateMail(mail) {
    if (mail.length > 255) {
        return false;
    }

    const re = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.exec(mail) !== null;
}

/**
 * Валидирует пароль
 *
 * @param {String} pass строка пароля для валидации
 * @return {Boolean} Истина, если прошла валидация
 */
export function validatePassword(pass) {
    if (pass.length > 64 || pass.length < 8) {
        return false;
    }
    return true;
}

/**
 * Валидирует имя
 *
 * @param {String} name строка пароля для валидации
 * @return {Boolean} Истина, если прошла валидация
 */
export function validateName(name) {
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
 * @return {Boolean} Истина, если прошла валидация
 */
export function validateBirthday(birthday) {
    const maxBirthDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 18)
    );

    return birthday - maxBirthDate < 0;
}

/**
 * Валидирует повторный ввод пароля
 *
 * @param {String} pass1 строка первого пароля для валидации
 * @param {String} pass2 строка второго пароля для валидации
 * @return {Boolean} Истина, если прошла валидация
 */
export function validatePasswordRepeat(pass1, pass2) {
    return pass1 === pass2;
}

/**
 * Валидирует ввод старого пароля
 *
 * @param {String} passNew строка первого пароля для валидации
 * @param {String} passOld строка старого пароля для валидации
 * @return {Boolean} Истина, если прошла валидация
 */
export function validatePasswordOld(passOld, passNew) {
    return passOld.length > 0 || passNew.length === 0;
}

/**
 * Валидирует ввод пола
 *
 * @param {String} sex строка пола
 * @return {Boolean} Истина, если прошла валидация
 */
export function validateSex(sex) {
    return sex in sexEnum || getKeyByValue(sexEnum, parseInt(sex));
}

/**
 * Валидирует ввод пола партнера
 *
 * @param {String} sex строка пола
 * @return {Boolean} Истина, если прошла валидация
 */
export function validateDatePreference(sex) {
    return (
        sex in datePreferenceEnum ||
        getKeyByValue(datePreferenceEnum, parseInt(sex))
    );
}

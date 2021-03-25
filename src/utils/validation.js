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
    if (pass1.length === 0) {
        return false;
    }

    return pass1 === pass2;
}

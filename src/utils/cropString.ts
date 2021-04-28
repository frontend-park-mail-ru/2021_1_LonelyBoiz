/**
 * Обрезает строку до нужной длины
 * @param {String} str Исходная строка
 * @param {Number} length Необходимая длина строки (включая точки)
 * @param {Boolean=true} addPoints Добавлять ли точки после обрезки
 * @returns {String}
 */
export const cropString = (
    str: string,
    length: number,
    addPoints = true
): string => {
    const newLength = addPoints && str.length > length ? length - 3 : length;
    let newStr = str.slice(0, newLength);
    if (addPoints && newLength < str.length) {
        newStr += '...';
    }
    return newStr;
};

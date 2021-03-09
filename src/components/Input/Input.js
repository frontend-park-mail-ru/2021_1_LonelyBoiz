const inputTemplate = 'Input.hbs';

/**
 * @class
 * Компонента ввода
 */
class Input {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {Input}
     * @param {Object} context контекст для ввода  {type="text", placeholder, bg_gray, defaultValue}
     */
    constructor (context) {
        this.template = Handlebars.templates[inputTemplate];
        this.context = context
    }

    /**
     * Отображает компонент ввода
     * @returns {string} Построенный компонент
     */
    render () {
        return this.template(this.context);
    }
}

export default Input;

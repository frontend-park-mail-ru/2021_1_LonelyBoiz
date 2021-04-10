import template from './Input.hbs';

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
     * @param {Object} context контекст для ввода {id, accept, type="text", placeholder, bg_gray, defaultValue, minValue}
     */
    constructor(context) {
        this.template = template;
        this.context = context || { type: 'text' };

        if (this.context.type && this.context.type === 'file') {
            this.context.isFile = true;
        }
    }

    /**
     * Отображает компонент ввода
     * @returns {String} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default Input;

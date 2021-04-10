import template from './Select.hbs';

/**
 * @class
 * Компонента выбора опций
 */
class Select {
    /**
     * Создает экземпляр Select
     *
     * @constructor
     * @this  {Select}
     * @param {Object} context контекст для выбора опций {title, options:[]}
     */
    constructor(context) {
        this.template = template;
        this.context = context || {};
    }

    /**
     * Отображает компонент выбора опций
     * @returns {String} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default Select;

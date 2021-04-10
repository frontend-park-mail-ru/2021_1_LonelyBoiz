import template from './FormItem.hbs';

/**
 * @class
 * Компонента FormItem
 */
class FormItem {
    /**
     * Создает экземпляр FormItem
     *
     * @constructor
     * @this  {FormItem}
     * @param {Object} context {id, top, bottom, children, valid|error}
     */
    constructor(context) {
        this.template = template;
        this.context = context;
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default FormItem;

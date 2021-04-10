import FormItem from '../FormItem/FormItem.js';
import template from './FormList.hbs';

/**
 * @class
 * Компонента FormList
 */
class FormList {
    /**
     * Создает экземпляр FormList
     *
     * @constructor
     * @this  {FormList}
     * @param {Object} context {id, formList:[top, children, bottom]}
     */
    constructor(context) {
        this.template = template;
        this.context = context;
        this.context.FormList = this.context.formList.map((item) => {
            return new FormItem(item).render();
        });
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default FormList;

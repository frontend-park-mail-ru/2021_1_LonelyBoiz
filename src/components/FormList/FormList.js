import FormItem from '../FormItem/FormItem.js';

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
     * @param {Object} context {formList:[top, children, bottom]}
     */
    constructor (context) {
        this.template = Handlebars.templates['FormList.hbs'];
        this.context = context;
        this.context.FormList = this.context.formList.map((item, i) => {
            return new FormItem(item).render();
        });
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render () {
        return this.template(this.context);
    }
}

export default FormList;

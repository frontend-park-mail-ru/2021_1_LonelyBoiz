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
	 */
	constructor() {
		this.template = Handlebars.templates['FormItem.hbs'];
	}

	/**
	 * @render
	 * @this  {FormItem}
	 * @param {Object} context {top, bottom, children}
	 */
	render(context) {
		return this.template(context);
	}
}

export default FormItem;

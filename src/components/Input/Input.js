/**
 * @class
 * Компонента Input
 */
class Input {
	/**
	 * Создает экземпляр Input
	 *
	 * @constructor
	 * @this  {Input}
	 */
	constructor() {
		this.template = Handlebars.templates['Input.hbs'];
	}

	/**
	 * @render
	 * @this  {Input}
	 * @param {Object} context {type="text", placeholder, bg_gray, defaultValue}
	 */
	render(context) {
		if (!context) {
			context = {};
		}
		if (!context.text) {
			context.type = 'text';
		}
		return this.template(context);
	}
}

export default Input;

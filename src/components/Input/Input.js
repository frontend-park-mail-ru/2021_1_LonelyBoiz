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
	 * @param {Object} context {type, placeholder, bg_gray}
	 */
	render(context) {
		if (!context.type) {
			context.type = 'text';
		}
		return this.template(context);
	}
}

export default Input;

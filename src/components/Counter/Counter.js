/**
 * @class
 * Компонента Counter
 */
class Counter {
	/**
	 * Создает экземпляр Counter
	 *
	 * @constructor
	 * @this  {Counter}
	 */
	constructor() {
		this.template = Handlebars.templates['Counter.hbs'];
	}

	/**
	 * @render
	 * @this  {Counter}
	 * @param {Object} context {text}
	 */
	render(context) {
		return this.template(context);
	}
}

export default Counter;

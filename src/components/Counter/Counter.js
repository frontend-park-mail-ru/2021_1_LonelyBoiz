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
	 * @param {Object} context {text}
	 */
	constructor(context) {
		this.template = Handlebars.templates['Counter.hbs'];
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

export default Counter;

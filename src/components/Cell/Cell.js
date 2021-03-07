/**
 * @class
 * Компонента Cell
 */
class Cell {
	/**
	 * Создает экземпляр Cell
	 *
	 * @constructor
	 * @this  {Cell}
	 */
	constructor() {
		this.template = Handlebars.templates['Cell.hbs'];
	}

	/**
	 * @render
	 * @this  {Cell}
	 * @param {Object} context {avatar, children, text, caption, after}
	 */
	render(context) {
		return this.template(context);
	}
}

export default Cell;

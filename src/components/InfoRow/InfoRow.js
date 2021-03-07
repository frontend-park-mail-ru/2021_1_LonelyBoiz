/**
 * @class
 * Компонента InfoRow
 */
class InfoRow {
	/**
	 * Создает экземпляр InfoRow
	 *
	 * @constructor
	 * @this  {InfoRow}
	 */
	constructor() {
		this.template = Handlebars.templates['InfoRow.hbs'];
	}

	/**
	 * @render
	 * @this  {InfoRow}
	 * @param {Object} context {iconSrc, text}
	 */
	render(context) {
		return this.template(context);
	}
}

export default InfoRow;

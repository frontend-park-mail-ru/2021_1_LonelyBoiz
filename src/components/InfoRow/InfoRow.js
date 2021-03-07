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
		this.context = {
			text: '',
		};
	}

	/**
	 * @render
	 * @this  {InfoRow}
	 * @param {Object} context {iconSrc, text=''}
	 */
	render(context) {
		this.context = context;
		return this.template(this.context);
	}
}

export default InfoRow;

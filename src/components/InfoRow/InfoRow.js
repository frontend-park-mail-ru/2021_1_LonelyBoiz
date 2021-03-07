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
	 * @param {Object} context {iconSrc, text=''}
	 * @param parent
	 */
	constructor() {
		this.template = Handlebars.templates['InfoRow.hbs'];
		this.context = {
			text: '',
		};
	}

	setContext(context) {
		this.context = context;
	}

	render() {
		return this.template(this.context);
	}
}

export default InfoRow;

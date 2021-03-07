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
	 * Задает контекст
	 *
	 * @setContext
	 * @this  {InfoRow}
	 * @param {Object} context {iconSrc, text=''}
	 */
	setContext(context) {
		this.context = context;
	}

	render() {
		return this.template(this.context);
	}
}

export default InfoRow;

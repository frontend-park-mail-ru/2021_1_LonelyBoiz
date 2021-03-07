/**
 * @class
 * Компонента Message
 */
class Message {
	/**
	 * Создает экземпляр Message
	 *
	 * @constructor
	 * @this  {Message}
	 */
	constructor() {
		this.template = Handlebars.templates['Message.hbs'];
	}

	/**
	 * @render
	 * @this  {Message}
	 * @param {Object} context {text, usersMessage}
	 */
	render(context) {
		return this.template(context);
	}
}

export default Message;

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
		this.context = {
			usersMessage: false,
		};
	}

	/**
	 * @render
	 * @this  {Message}
	 * @param {Object} context [text, usersMessage=false]
	 */
	render(context) {
		this.context = context;
		return this.template(this.context);
	}
}

export default Message;

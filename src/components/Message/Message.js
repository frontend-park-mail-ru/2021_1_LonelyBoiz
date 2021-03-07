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
	 * Задает контекст
	 *
	 * @setContext
	 * @this  {Message}
	 * @param {Object} context [text, usersMessage=false]
	 */
	setContext(context) {
		this.context = context;
	}

	render() {
		return this.template(this.context);
	}
}

export default Message;

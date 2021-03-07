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
	 * @param {Object} context [text, usersMessage=false]
	 * @param parent
	 */
	constructor() {
		this.template = Handlebars.templates['Message.hbs'];
		this.context = {
			usersMessage: false,
		};
	}

	setContext(context) {
		this.context = context;
	}

	render() {
		return this.template(this.context);
	}
}

export default Message;

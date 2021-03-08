import WriteBar from '../WriteBar/WriteBar.js';
import Message from '../Message/Message.js';
/**
 * @class
 * Компонента MessageBox
 */
class MessageBox {
	/**
	 * Создает экземпляр MessageBox
	 *
	 * @constructor
	 * @this  {MessageBox}
	 */
	constructor() {
		this.template = Handlebars.templates['MessageBox.hbs'];
	}

	/**
	 * @render
	 * @this  {MessageBox}
	 * @param {Object} context {messages:[{text, usersMessage}], chatUser:{name, avatar}}
	 */
	render(context) {
		const writeBar = new WriteBar();
		context.WriteBar = writeBar.render();

		const message = new Message();
		context.Messages = context.messages.map((item, i) => {
			return message.render(item);
		});

		return this.template(context);
	}
}

export default MessageBox;

import Input from '../Input/Input.js';
import ChatItem from '../ChatItem/ChatItem.js';
/**
 * @class
 * Компонента ChatListBox
 */
class ChatListBox {
	/**
	 * Создает экземпляр ChatListBox
	 *
	 * @constructor
	 * @this  {ChatListBox}
	 */
	constructor() {
		this.template = Handlebars.templates['ChatListBox.hbs'];
	}

	/**
	 * @render
	 * @this  {ChatListBox}
	 * @param {Object} context {chats:[{user:{name, avatar}, lastMessage:{text, time}, counter}]}
	 */
	render(context) {
		const input = new Input();
		context.Input = input.render({
			placeholder: 'Поиск',
		});

		context.Chats = [];
		const chatItem = new ChatItem();
		for (let i in context.chats) {
			context.Chats.push(chatItem.render(context.chats[i]));
		}

		return this.template(context);
	}
}

export default ChatListBox;

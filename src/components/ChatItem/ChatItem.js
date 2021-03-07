import Counter from '../Counter/Counter.js';
import Cell from '../Cell/Cell.js';
/**
 * @class
 * Компонента ChatItem
 */
class ChatItem {
	/**
	 * Создает экземпляр ChatItem
	 *
	 * @constructor
	 * @this  {ChatItem}
	 */
	constructor() {
	}

	/**
	 * @render
	 * @this  {ChatItem}
	 * @param {Object} context {user:{name, avatar}, lastMessage:{text, time}, counter}
	 */
	render(context) {
		if (context.user) {
			if (context.user.name) {
				context.children = context.user.name;
			}

			if (context.user.avatar) {
				context.avatar = context.user.avatar;
			}
		}

		if (context.lastMessage && context.lastMessage.text) {
			context.caption = context.lastMessage.text;
			if (context.lastMessage.time) {
				context.caption += ' ' + context.lastMessage.time;
			}
		}

		if (context.counter) {
			const counter = new Counter();
			context.after = counter.render({ text: context.counter });
		}

		const cell = new Cell();
		return cell.render(context);
	}
}

export default ChatItem;

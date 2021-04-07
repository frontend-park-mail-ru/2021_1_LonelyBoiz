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
     * @param {{user:{name, avatar}, lastMessage:{text, time: String}, counter}} context
     */
    constructor(context) {
        this.context = context;
        if (this.context.user) {
            if (this.context.user.name) {
                this.context.children = this.context.user.name;
            }

            if (this.context.user.avatar) {
                this.context.avatar = this.context.user.avatar;
            }
        }

        if (this.context.lastMessage && this.context.lastMessage.text) {
            this.context.caption = `<div class="chat-item__last-message">${this.context.lastMessage.text}</div>`;
            if (this.context.lastMessage.time) {
                this.context.caption += `<div class="chat-item__time">${this.context.lastMessage.time}</div>`;
            }
        }
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        if (this.context.counter) {
            this.context.after = new Counter({
                text: this.context.counter
            }).render();
        }

        return new Cell(this.context).render();
    }
}

export default ChatItem;

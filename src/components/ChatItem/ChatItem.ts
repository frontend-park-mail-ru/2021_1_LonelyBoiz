import Component from '../Component';
import Counter from '../Counter/Counter';
import Cell from '../Cell/Cell';
import './ChatItem.scss';

export interface IChatItem {
    user?: { name?: string; avatar?: string, id?: string };
    lastMessage?: { text?: string; time?: string };
    counter?: string;
    chatId?: number;
    isOpened?: boolean;
}

/**
 * @class
 * Компонента ChatItem
 */
class ChatItem extends Component {
    /**
     * Создает экземпляр ChatItem
     *
     * @constructor
     * @this  {ChatItem}
     * @param {IChatItem} context
     */
    constructor(context?: IChatItem) {
        super(context);

        if (this.context.user) {
            if (this.context.user.name) {
                this.context.children = this.context.user.name;
            }

            if (this.context.user.avatar) {
                this.context.avatar = this.context.user.avatar;
            }
        }

        const lastMessageText = this.context.lastMessage.text ? this.context.lastMessage.text : '';
        const lastMessageTime = this.context.lastMessage.time ? this.context.lastMessage.time : '';
        this.context.caption = `<div class="chat-item__last-message">${lastMessageText}</div>`;

        const chatTimeClasses = lastMessageTime ? 'chat-item__time chat-item__time_separator' : 'chat-item__time';
        this.context.caption += `<div class="${chatTimeClasses}">${lastMessageTime}</div>`;
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render(): string {
        if (this.context.counter) {
            this.context.after = new Counter({
                text: this.context.counter
            }).render();
        }

        return new Cell(this.context).render();
    }
}

export default ChatItem;

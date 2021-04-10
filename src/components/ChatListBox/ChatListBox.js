import Input from '../Input/Input.js';
import ChatItem from '../ChatItem/ChatItem.js';
import template from './ChatListBox.hbs';

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
     * @param {Object} context {chats:[{user:{name, avatar}, lastMessage:{text, time}, counter}]}
     */
    constructor(context) {
        this.template = template;
        this.context = context || {};
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        this.context.Input = new Input({
            placeholder: 'Поиск'
        }).render();

        this.context.Chats = [];
        for (const i in this.context.chats) {
            this.context.Chats.push(
                new ChatItem(this.context.chats[i]).render()
            );
        }

        return this.template(this.context);
    }
}

export default ChatListBox;

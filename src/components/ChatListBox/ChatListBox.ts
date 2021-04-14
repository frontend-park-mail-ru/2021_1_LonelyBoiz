import Component from '../Component';
import Input from '../Input/Input';
import ChatItem from '../ChatItem/ChatItem';
import template from './ChatListBox.hbs';
import './ChatListBox.scss';

interface IChatListBox {
    chats: [
        {
            user?: { name?: string; avatar?: string };
            lastMessage?: { text?: string; time?: string };
            counter?: string;
        }
    ];
}

/**
 * @class
 * Компонента ChatListBox
 */
class ChatListBox extends Component {
    /**
     * Создает экземпляр ChatListBox
     *
     * @constructor
     * @this  {ChatListBox}
     * @param {IChatListBox} context
     */
    constructor(context?: IChatListBox) {
        super(context, template);
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render(): string {
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

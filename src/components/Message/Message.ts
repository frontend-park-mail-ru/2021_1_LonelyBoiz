import Component from '../Component';
import { IconsSrc } from '../../consts/icons';
import EmojisList from '../../consts/emojis';
import IconClass from '../Icon/Icon';
import template from './Message.hbs';
import './Message.css';

export interface IMessageItem {
    text?: string;
    usersMessage?: boolean;
    messageId?: number;
    reaction?: keyof typeof EmojisList;
}

/**
 * @class
 * Компонента Message
 */
class Message extends Component {
    /**
     * Создает экземпляр Message
     *
     * @constructor
     * @this  {Message}
     * @param {IMessageItem} context
     */
    constructor(context?: IMessageItem) {
        super(context, template);
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render(): string {
        if (!this.context.usersMessage) {
            this.context.emojiIcon = EmojisList[this.context.reaction] ?? new IconClass({
                iconCode: IconsSrc.smile,
                size: 28,
                iconClasses: 'message__smile-icon gray-icon'
            }).render();
        }
        return this.template(this.context);
    }
}

export default Message;

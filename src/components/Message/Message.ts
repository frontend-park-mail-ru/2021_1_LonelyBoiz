import Component from '../Component';
import { IconsSrc } from '../../consts/icons';
import EmojisList from '../../consts/emojis';
import IconClass from '../Icon/Icon';
import template from './Message.hbs';
import './Message.scss';
import { checkStringEmojis } from '../../utils/helpers';

export interface IMessageItem {
    text?: string;
    usersMessage?: boolean;
    messageId?: number;
    date?: Date;
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
        if (this.context.reaction >= 0) {
            this.context.emojiIcon = new IconClass({
                iconCode: EmojisList[this.context.reaction],
                size: 28,
                iconClasses: 'message__smile-icon gray-icon'
            }).render();
        } else if (!this.context.usersMessage) {
            this.context.emojiIcon = new IconClass({
                iconCode: IconsSrc.smile,
                size: 28,
                iconClasses: 'message__smile-icon gray-icon'
            }).render();
        }

        this.context.date = undefined;

        this.context.messageEmojis = checkStringEmojis(this.context.text);

        return this.template(this.context);
    }
}

export default Message;

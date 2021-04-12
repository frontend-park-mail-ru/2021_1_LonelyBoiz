import Component from '../Component';
import { IconsSrc } from '../../consts/icons';
import IconClass from '../Icon/Icon';
import template from './Message.hbs';
import './Message.css';

export interface IMessageItem {
    text?: string;
    usersMessage?: boolean;
    messageId?: number;
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
        this.context.SmileIcon = new IconClass({
            iconCode: IconsSrc.smile,
            size: 28,
            iconClasses: 'message__smile-icon gray-icon pointer-icon'
        }).render();
        return this.template(this.context);
    }
}

export default Message;

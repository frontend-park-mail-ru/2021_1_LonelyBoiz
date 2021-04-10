import { IconsSrc } from '../../consts/icons.js';
import IconClass from '../Icon/Icon.js';
import template from './Message.hbs';

/**
 * @class
 * Компонента Message
 */
class Message {
    /**
     * Создает экземпляр Message
     *
     * @constructor
     * @this  {Message}
     * @param {{text, usersMessage: Boolean}} context
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
        this.context.SmileIcon =
            new IconClass({
                iconCode: IconsSrc.smile,
                size: 28,
                iconClasses: 'message__smile-icon gray-icon'
            }).render();
        return this.template(this.context);
    }
}

export default Message;

import WriteBar from '../WriteBar/WriteBar.js';
import Message from '../Message/Message.js';
import template from './MessageBox.hbs';

/**
 * @class
 * Компонента MessageBox
 */
class MessageBox {
    /**
     * Создает экземпляр MessageBox
     *
     * @constructor
     * @this  {MessageBox}
     * @param {{ messages:[{text, usersMessage: Boolean}], chatUser:{name, avatar} }} context
     */
    constructor(context) {
        this.template = template;
        this.context = context || {};
    }

    /**
     * @render
     * @this  {MessageBox}
     */
    render() {
        this.context.WriteBar = new WriteBar().render();
        this.context.Messages = [];
        if (this.context.messages && this.context.messages.length > 0) {
            this.context.messages.map((item) => {
                return new Message(item).render();
            });
        }
        return this.template(this.context);
    }
}

export default MessageBox;

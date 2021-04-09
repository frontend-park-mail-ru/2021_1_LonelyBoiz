import WriteBar from '../WriteBar/WriteBar.js';
import Message from '../Message/Message.js';

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
        this.template = Handlebars.templates['MessageBox.hbs'];
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

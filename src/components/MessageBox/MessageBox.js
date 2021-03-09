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
     * @param {Object} context {messages:[{text, usersMessage}], chatUser:{name, avatar}}
     */
    constructor(context) {
        this.template = Handlebars.templates['MessageBox.hbs'];
        this.context = context;
    }

    /**
     * @render
     * @this  {MessageBox}
     */
    render() {
        this.context.WriteBar = new WriteBar().render();
        this.context.Messages = this.context.messages.map((item, i) => {
            return new Message(item).render();
        });
        return this.template(this.context);
    }
}

export default MessageBox;

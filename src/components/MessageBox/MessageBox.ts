import Component from '../Component';
import WriteBar from '../WriteBar/WriteBar';
import Message from '../Message/Message';
import template from './MessageBox.hbs';
import './MessageBox.css';

interface IMessageBox {
    messages?: [{ text?: string; usersMessage?: boolean }];
    chatUser?: { name?: string; avatar?: string };
}

/**
 * @class
 * Компонента MessageBox
 */
class MessageBox extends Component {
    /**
     * Создает экземпляр MessageBox
     *
     * @constructor
     * @this  {MessageBox}
     * @param {} context
     */
    constructor(context?: IMessageBox) {
        super(context, template);
    }

    /**
     * @render
     * @this  {MessageBox}
     */
    render(): string {
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

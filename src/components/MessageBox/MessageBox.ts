import Component from '../Component';
import WriteBar from '../WriteBar/WriteBar';
import Message from '../Message/Message';
import template from './MessageBox.hbs';
import './MessageBox.scss';
import IconClass from '../Icon/Icon';
import { IconsSrc } from '../../consts/icons';

type message = { text?: string; usersMessage?: boolean };

interface IMessageBox {
    messages?: message[];
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
            this.context.messages.map((item: message) => {
                return new Message(item).render();
            });
        }

        this.context.chevron_back = new IconClass({
            iconCode: IconsSrc.chevron_back,
            size: 28,
            iconClasses: 'message-header__chevron-back'
        }).render();

        this.context.lock = new IconClass({
            iconCode: IconsSrc.lock,
            size: 28,
            iconClasses: 'pointer'
        }).render();

        return this.template(this.context);
    }
}

export default MessageBox;

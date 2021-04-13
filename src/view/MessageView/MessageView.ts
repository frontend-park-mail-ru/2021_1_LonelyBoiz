import MessageBox from '../../components/MessageBox/MessageBox';
import ChatListBox from '../../components/ChatListBox/ChatListBox';
import BaseView from '../BaseView';
import Views from '../../consts/views';
import template from './MessageView.hbs';
import Context from '../../utils/Context';
import './MessageView.css';

/**
 * @class
 * Страница логина
 */
class MessageView extends BaseView {
    /**
     * Создает экземпляр MessageView
     *
     * @constructor
     * @this  {MessageView}
     * @param {Context} context
     */
    constructor(context?: Context) {
        super({ view: Views.Messages, template, context });
    }

    /**
     * Отображает страницу
     */
    show(): void {
        super.show();
        this.context.ChatList = new ChatListBox().render();
        this.context.Message = new MessageBox().render();
        this.root.innerHTML = this.template(this.context);
    }
}

export default MessageView;

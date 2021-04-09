import MessageBox from '../../components/MessageBox/MessageBox.js';
import ChatListBox from '../../components/ChatListBox/ChatListBox.js';
import BaseView from '../BaseView.js';
import Views from '../../consts/views.js';

const messageViewTemplate = 'MessageView.hbs';

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
     * @param {Object} context
     */
    constructor(context) {
        super(Views.Messages);
        this.template = Handlebars.templates[messageViewTemplate];
        this.context = context || {};
    }

    /**
     * Отображает страницу
     */
    show() {
        super.show();
        this.context.ChatList = new ChatListBox().render();
        this.context.Message = new MessageBox().render();
        this.root.innerHTML = this.template(this.context);
    }
}

export default MessageView;

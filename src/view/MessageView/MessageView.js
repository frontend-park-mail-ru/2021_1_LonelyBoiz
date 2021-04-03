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
        this.context.ChatList = new ChatListBox({
            chats: [
                {
                    user: { name: 'Name asda', avatar: 'img/logo.png' },
                    lastMessage: { text: 'asd', time: '2 m' },
                    counter: 1000
                },
                {
                    user: { name: 'Name asda', avatar: 'img/logo.png' },
                    lastMessage: { text: 'asd', time: '2 m' },
                    counter: 1000
                }
            ]
        }).render();

        this.context.Message = new MessageBox({
            messages: [
                { text: 'qwe' },
                { text: 'qwe', usersMessage: true },
                { text: 'qwe' },
                { text: 'qwe', usersMessage: true }
            ],
            chatUser: { name: 'asd', avatar: 'img/logo.png' }
        }).render();

        this.root.innerHTML = this.template(this.context);
    }
}

export default MessageView;

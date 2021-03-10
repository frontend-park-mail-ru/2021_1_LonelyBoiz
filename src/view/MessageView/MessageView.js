import Header from '../../components/Header/Header.js';
import MessageBox from '../../components/MessageBox/MessageBox.js';
import ChatListBox from '../../components/ChatListBox/ChatListBox.js';
import headerIcons from '../../consts/headerIcons.js';

const messageViewTemplate = 'MessageView.hbs';

/**
 * @class
 * Страница логина
 */
class MessageView {
    /**
     * Создает экземпляр MessageView
     *
     * @constructor
     * @this  {MessageView}
     * @param {Object} context
     */
    constructor(context) {
        this.template = Handlebars.templates[messageViewTemplate];
        this.root = document.getElementById('app');
        this.context = context || {};
    }

    /**
     * Отображает страницу
     */
    show() {
        this.context.Header = new Header({
            activeIcon: headerIcons.send_message
        }).render();

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

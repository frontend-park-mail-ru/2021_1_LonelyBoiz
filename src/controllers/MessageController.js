import BaseController from './BaseController.js';
import MessageView from '../view/MessageView/MessageView.js';
import ChatItem from '../components/ChatItem/ChatItem.js';
import Message from '../components/Message/Message.js';
import IconClass from '../components/Icon/Icon.js';
import Spinner from '../components/Spinner/Spinner.js';
import { IconsSrc } from '../consts/icons.js';
import Listener from '../utils/Listener.js';
import EmojiesClass from '../utils/Emojies.js';
import EmojiesList from '../consts/emojies.js';

/**
 * @class
 * Контроллер логина
 */
class MessageController extends BaseController {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {MessageController}
     */
    constructor() {
        super(new MessageView());
        this.activeChat = null;
        this.chats = [];
        this.messages = [];
        this.elements = {
            chatsList: null,
            messageList: null,
            noChatsList: null,
            noMessageList: null,
            headerIcon: null,
            headerTitle: null,
            header: null,
            writeBar: null,
            writeBarIcon: null,
            writeBarInput: null
        };
        this.sendingMessage = false;
        this.loaderChats = false;
        this.endChats = false;
        this.endChat = false;
        this.emojeisListener = new Listener();
    }

    start() {
        this.view.show();
        this.setElements();
        this.clearMessages();
        this.hiddenChat(true);

        this.chatDemoContent = [
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 10
            },
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Не Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 12
            },
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Не Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 12
            },
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Не Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 12
            },
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Не Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 12
            },
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Не Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 12
            },
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Не Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 12
            },
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Не Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 12
            },
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Не Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 12
            },
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Не Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 12
            },
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Не Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 12
            },
            {
                user: {
                    avatar: 'img/img.png',
                    name: 'Не Красивое имя'
                },
                lastMessage: {
                    text: 'Приветик',
                    time: '2 м'
                },
                chatId: 12
            }
        ];

        this.messageDemoContent = [
            {
                text: 'qweqweq',
                usersMessage: false
            },
            {
                text: 'asdqw',
                usersMessage: true,
                messageId: 10
            },
            {
                text: 'qweqweq',
                usersMessage: false
            },
            {
                text: 'asdqw',
                usersMessage: true,
                messageId: 10
            },
            {
                text: 'qweqweq',
                usersMessage: false
            },
            {
                text: 'asdqw',
                usersMessage: true,
                messageId: 10
            },
            {
                text: 'qweqweq',
                usersMessage: false
            },
            {
                text: 'asdqw',
                usersMessage: true,
                messageId: 10
            },
            {
                text: 'qweqweq',
                usersMessage: false
            },
            {
                text: 'asdqw',
                usersMessage: true,
                messageId: 10
            },
            {
                text: 'qweqweq',
                usersMessage: false
            },
            {
                text: 'asdqw',
                usersMessage: true,
                messageId: 10
            }
        ];

        this.registerListener({
            element: this.elements.writeBarIcon,
            type: 'click',
            listener: (e) => {
                this.sendMessage();
            }
        });

        this.registerListener({
            element: this.elements.messageList,
            type: 'scroll',
            listener: (e) => {
                const element = e.currentTarget;
                if (element.scrollTop <= 350) {
                    this.onScrollTopChat();
                }
            }
        });

        this.registerListener({
            element: this.elements.chatsList,
            type: 'scroll',
            listener: (e) => {
                const element = e.currentTarget;
                if (
                    element.scrollHeight -
                        element.scrollTop -
                        element.clientHeight <=
                    150
                ) {
                    this.onScrollTopChats();
                }
            }
        });

        this.onScrollTopChats();
    }

    finish() {
        this.emojeisListener.deleteListeners();
    }

    setElements() {
        this.elements.chatsList = document.querySelector('.chats-list__list');
        this.elements.messageList = document.querySelector(
            '.message-chat__list'
        );
        this.elements.noChatsList = document.getElementById(
            'chats-list__no-message'
        );
        this.elements.noMessageList = document.getElementById(
            'message-chat__no-message'
        );
        this.elements.noChatSelectedList = document.getElementById(
            'message-chat__no-chat-selected'
        );
        this.elements.headerIcon = document.querySelector(
            '.message-chat .message-header .icon'
        );
        this.elements.headerTitle = document.querySelector(
            '.message-chat .message-header .message-header__title'
        );
        this.elements.writeBarIcon = document.querySelector(
            '.message-chat .message-chat__writebar .write-bar__icon'
        );
        this.elements.writeBarInput = document.querySelector(
            '.message-chat .message-chat__writebar .input-block__input'
        );
        this.elements.header = document.querySelector('.message-header');
        this.elements.writeBar = document.querySelector(
            '.message-chat__writebar'
        );
    }

    onScrollTopChat() {
        if (!this.loaderChat && !this.endChat) {
            this.loaderChat = true;
            const insertionElem = this.elements.messageList.insertBefore(
                this.getLoaderSpinner(),
                this.elements.messageList.firstChild
            );

            setTimeout(() => {
                insertionElem.remove();
                this.addMessages(this.messageDemoContent);
                this.endChat = true;
                this.loaderChat = false;
            }, 150);
        }
    }

    onScrollTopChats() {
        if (!this.loaderChats && !this.endChats) {
            this.elements.noChatsList.hidden = true;
            this.loaderChats = true;
            const insertionElem = this.elements.chatsList.appendChild(
                this.getLoaderSpinner()
            );

            setTimeout(() => {
                insertionElem.remove();
                this.addChats(this.chatDemoContent);
                this.endChats = true;
                this.loaderChats = false;
            }, 150);
        }
    }

    /**
     *
     * @param {{user:{name, avatar}, lastMessage:{text, time: String}, counter, chatId}[]} chats
     */
    addChats(chats) {
        chats.forEach((item) => {
            const tmpDiv = document.createElement('div');
            tmpDiv.innerHTML = new ChatItem(item).render();
            const tmp = tmpDiv.firstChild;

            if (item.chatId) {
                tmp.dataset.chatId = item.chatId;
            }

            const insertionElem = this.elements.chatsList.appendChild(tmp);
            this.chats.push({ ...item, elem: insertionElem });

            this.registerListener({
                element: insertionElem,
                type: 'click',
                listener: (e) => {
                    this.openChat(e.currentTarget.dataset.chatId);
                }
            });
        });
        if (this.chats.length > 0) {
            this.elements.noChatsList.hidden = true;
        } else {
            this.elements.noChatsList.hidden = false;
        }
    }

    updateChat() {}

    openChat(chatId) {
        this.clearMessages();
        this.emojeisListener.deleteListeners();
        document.querySelectorAll('.cell').forEach((item) => {
            item.style.backgroundColor = 'unset';
        });

        let currentChat;
        this.chats.forEach((item) => {
            if (item.chatId && item.chatId === Number(chatId)) {
                currentChat = item;
                item.elem.style.backgroundColor = 'var(--field_background)';
            }
        });

        if (!currentChat) {
            console.error('Нет чата в списке');
        }

        this.activeChat = currentChat;
        this.elements.headerIcon.src = currentChat.user.avatar;
        this.elements.headerTitle.innerHTML = currentChat.user.name;

        this.hiddenChat(false);
        this.onScrollTopChat();
    }

    clearMessages() {
        this.hiddenChat(true);
        this.elements.messageList.innerHTML = '';
        this.messages = [];
    }

    /**
     * Отправка сообщения
     */
    sendMessage() {
        if (this.sendingMessage) {
            return;
        }
        const value = this.elements.writeBarInput.value;
        if (value.length === 0) {
            return;
        }

        this.setSendingMessage(true);

        setTimeout(() => {
            this.setSendingMessage(false);
            this.elements.writeBarInput.value = '';
            this.addMessages([{ text: value, usersMessage: true }], true);
        }, 150);
    }

    /**
     * Отображает кнопку отправки сообщения или спиннер загрузки
     * @param {Boolean} set
     */
    setSendingMessage(set) {
        this.sendingMessage = set;
        if (set) {
            this.elements.writeBarInput.readOnly = true;
            this.elements.writeBarIcon.innerHTML = new Spinner({
                classes: 'gray-icon'
            }).render();
        } else {
            this.elements.writeBarInput.readOnly = false;
            this.elements.writeBarIcon.innerHTML = new IconClass({
                iconCode: IconsSrc.send_message_stroke,
                iconClasses: 'pointer-icon'
            }).render();
        }
    }

    /**
     * Сохраняет икноку у сообщения
     * @param {Object} messageElem
     * @param {String} emojieId
     */
    setEmojies(messageElem, key) {
        messageElem.children[0].children[0].innerHTML = EmojiesList[key];
    }

    /**
     *
     * @param {{text, usersMessage: Boolean, messageId}[]} messages
     * @param {Boolean} newMessages
     */
    addMessages(messages, newMessages) {
        const prevScrollHeight = this.elements.messageList.scrollHeight;

        messages.forEach((item) => {
            const tmpDiv = document.createElement('div');
            tmpDiv.innerHTML = new Message(item).render();
            const tmp = tmpDiv.firstChild;
            if (item.messageId) {
                tmp.dataset.messageId = item.messageId;
            }

            let insertionElem;
            if (newMessages) {
                insertionElem = this.elements.messageList.appendChild(tmp);
            } else {
                insertionElem = this.elements.messageList.insertBefore(
                    tmp,
                    this.elements.messageList.firstChild
                );
            }
            this.messages.push({ ...item, elem: insertionElem });

            this.emojeisListener.registerListener({
                element: insertionElem.children[0],
                type: 'click',
                listener: (e) => {
                    new EmojiesClass((key) => {
                        this.setEmojies(insertionElem, key);
                    });
                }
            });
        });

        const newScrollHeight = this.elements.messageList.scrollHeight;
        this.elements.messageList.scrollTo({
            top: newScrollHeight - prevScrollHeight,
            behavior: 'auto'
        });

        if (this.messages.length > 0) {
            this.elements.noMessageList.hidden = true;
        } else {
            this.elements.noMessageList.hidden = false;
        }
    }

    updateMessages() {}

    /**
     * Прятает/показывает
     * @param {Boolean} hidden
     */
    hiddenChat(hidden) {
        this.elements.writeBar.hidden = hidden;
        this.elements.header.style.visibility = hidden ? 'hidden' : 'unset';
        this.elements.messageList.hidden = hidden;
        this.elements.noChatSelectedList.hidden = !hidden;
    }

    /**
     * Возвращает добавленный спиннер
     * @returns {Object} DOMelement
     */
    getLoaderSpinner() {
        const tmpDiv = document.createElement('div');
        tmpDiv.innerHTML = new Spinner({
            classes: 'gray-icon message-loader'
        }).render();
        return tmpDiv.firstChild;
    }
}

export default MessageController;

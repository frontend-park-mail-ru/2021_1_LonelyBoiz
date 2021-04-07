import BaseController from './BaseController.js';
import MessageView from '../view/MessageView/MessageView.js';
import ChatItem from '../components/ChatItem/ChatItem.js';
import Message from '../components/Message/Message.js';
import IconClass from '../components/Icon/Icon.js';
import Spinner from '../components/Spinner/Spinner.js';
import { IconsSrc } from '../consts/icons.js';

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
        this.chatsListElem = null;
        this.messageListElem = null;
        this.noChatsListElem = null;
        this.noMessageListElem = null;
        this.headerIconElem = null;
        this.headerTitleElem = null;
        this.headerElem = null;
        this.writeBarElem = null;
        this.writeBarIconElem = null;
        this.writeBarInputElem = null;
        this.sendingMessage = false;
        this.loaderChats = false;
        this.endChats = false;
        this.endChat = false;
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
                text: 'zxczxcx'
            }
        ];

        this.registerListener({
            element: this.writeBarIconElem,
            type: 'click',
            listener: (e) => {
                this.sendMessage();
            }
        });

        this.registerListener({
            element: this.messageListElem,
            type: 'scroll',
            listener: (e) => {
                const element = e.currentTarget;
                console.log(
                    element.scrollTop,
                    element.clientHeight,
                    element.scrollHeight
                );
                if (element.scrollTop <= 350) {
                    this.onScrollTopChat();
                }
            }
        });

        this.registerListener({
            element: this.chatsListElem,
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

    setElements() {
        this.chatsListElem = document.querySelector('.chats-list__list');
        this.messageListElem = document.querySelector('.message-chat__list');
        this.noChatsListElem = document.getElementById(
            'chats-list__no-message'
        );
        this.noMessageListElem = document.getElementById(
            'message-chat__no-message'
        );
        this.noChatSelectedListElem = document.getElementById(
            'message-chat__no-chat-selected'
        );
        this.headerIconElem = document.querySelector(
            '.message-chat .message-header .icon'
        );
        this.headerTitleElem = document.querySelector(
            '.message-chat .message-header .message-header__title'
        );
        this.writeBarIconElem = document.querySelector(
            '.message-chat .message-chat__writebar .write-bar__icon'
        );
        this.writeBarInputElem = document.querySelector(
            '.message-chat .message-chat__writebar .input-block__input'
        );
        this.headerElem = document.querySelector('.message-header');
        this.writeBarElem = document.querySelector('.message-chat__writebar');
    }

    onScrollTopChat() {
        if (!this.loaderChat && !this.endChat) {
            this.loaderChat = true;
            const insertionElem = this.messageListElem.insertBefore(
                this.getLoaderSpinner(),
                this.messageListElem.firstChild
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
            this.noChatsListElem.hidden = true;
            this.loaderChats = true;
            const insertionElem = this.chatsListElem.appendChild(
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

            const insertionElem = this.chatsListElem.appendChild(tmp);
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
            this.noChatsListElem.hidden = true;
        } else {
            this.noChatsListElem.hidden = false;
        }
    }

    updateChat() {}

    openChat(chatId) {
        this.clearMessages();
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
        this.headerIconElem.src = currentChat.user.avatar;
        this.headerTitleElem.innerHTML = currentChat.user.name;

        this.hiddenChat(false);
        this.onScrollTopChat();
    }

    clearMessages() {
        this.hiddenChat(true);
        this.messageListElem.innerHTML = '';
        this.messages = [];
    }

    /**
     * Отправка сообщения
     */
    sendMessage() {
        if (this.sendingMessage) {
            return;
        }
        const value = this.writeBarInputElem.value;
        if (value.length === 0) {
            return;
        }

        this.setSendingMessage(true);

        setTimeout(() => {
            this.setSendingMessage(false);
            this.writeBarInputElem.value = '';
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
            this.writeBarInputElem.readOnly = true;
            this.writeBarIconElem.innerHTML = new Spinner({
                classes: 'gray-icon'
            }).render();
        } else {
            this.writeBarInputElem.readOnly = false;
            this.writeBarIconElem.innerHTML = new IconClass({
                iconCode: IconsSrc.send_message_stroke,
                iconClasses: 'pointer-icon'
            }).render();
        }
    }

    /**
     *
     * @param {{text, usersMessage: Boolean, messageId}[]} messages
     * @param {Boolean} newMessages
     */
    addMessages(messages, newMessages) {
        const prevScrollHeight = this.messageListElem.scrollHeight;

        messages.forEach((item) => {
            const tmpDiv = document.createElement('div');
            tmpDiv.innerHTML = new Message(item).render();
            const tmp = tmpDiv.firstChild;
            if (item.messageId) {
                tmp.dataset.messageId = item.messageId;
            }

            let insertionElem;
            if (newMessages) {
                insertionElem = this.messageListElem.appendChild(tmp);
            } else {
                insertionElem = this.messageListElem.insertBefore(
                    tmp,
                    this.messageListElem.firstChild
                );
            }
            this.messages.push({ ...item, elem: insertionElem });
        });

        const newScrollHeight = this.messageListElem.scrollHeight;
        this.messageListElem.scrollTo({
            top: newScrollHeight - prevScrollHeight,
            behavior: 'auto'
        });

        if (this.messages.length > 0) {
            this.noMessageListElem.hidden = true;
        } else {
            this.noMessageListElem.hidden = false;
        }
    }

    updateMessages() {}

    /**
     * Прятает/показывает
     * @param {Boolean} hidden
     */
    hiddenChat(hidden) {
        this.writeBarElem.hidden = hidden;
        this.headerElem.style.visibility = hidden ? 'hidden' : 'unset';
        this.messageListElem.hidden = hidden;
        this.noChatSelectedListElem.hidden = !hidden;
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

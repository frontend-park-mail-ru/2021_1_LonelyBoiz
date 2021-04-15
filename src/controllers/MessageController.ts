import BaseController from './BaseController';
import MessageView from '../view/MessageView/MessageView';
import ChatItem, { IChatItem } from '../components/ChatItem/ChatItem';
import Message, { IMessageItem } from '../components/Message/Message';
import IconClass from '../components/Icon/Icon';
import Spinner from '../components/Spinner/Spinner';
import { IconsSrc } from '../consts/icons';
import Listener from '../utils/Listener';
import EmojisPopup from '../utils/Emojis';
import EmojisList from '../consts/emojis';
import eventBus from '../utils/eventBus';
import Events from '../consts/events';
import Routes from '../consts/routes';
import userModel from '../models/UserModel';
import chatModel from '../models/ChatModel';
import Context from '../utils/Context';
import webSocketListener, { IMessageSocketData, IChatSocketData } from '../utils/WebSocketListener';
import backendLocation from '../consts/config';
import { timeToStringByTime } from '../utils/helpers';

interface IElements {
    chatsList?: HTMLElement;
    messageList?: HTMLElement;
    noChatsList?: HTMLElement;
    noMessageList?: HTMLElement;
    headerIcon?: HTMLImageElement;
    headerTitle?: HTMLElement;
    header?: HTMLElement;
    writeBar?: HTMLElement;
    writeBarIcon?: HTMLElement;
    writeBarInput?: HTMLInputElement;
    noChatSelectedList?: HTMLElement;
}

/**
 * @class
 * Контроллер логина
 */
class MessageController extends BaseController {
    activeChat: IChatItem = null;
    chats: IChatItem[] = [];
    messages: IMessageItem[] = [];
    sendingMessage = false;
    loaderChats = false;
    loaderChat = false;
    endChats = false;
    endChat = false;
    emojeisListener = new Listener();
    elements: IElements = {
        chatsList: null,
        messageList: null,
        noChatsList: null,
        noMessageList: null,
        headerIcon: null,
        headerTitle: null,
        header: null,
        writeBar: null,
        writeBarIcon: null,
        writeBarInput: null,
        noChatSelectedList: null
    };

    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {MessageController}
     */
    constructor() {
        super({ view: new MessageView() });
        eventBus.connect(Events.newMessage, this.addNewMessageHandler.bind(this));
        eventBus.connect(Events.newChat, this.addNewChatHandler.bind(this));
    }

    start(queryParams: Context): void {
        this.queryParams = queryParams;
        userModel
            .auth()
            .then((response) => {
                if (!response.ok) {
                    eventBus.emit(Events.routeChange, Routes.loginRoute);
                }
                webSocketListener.listen();
                eventBus.emit(Events.updateAvatar);
                this.view.show();
                this.setElements();
                this.clearMessages();
                this.hiddenChat(true);

                this.registerListener({
                    element: this.elements.writeBarIcon,
                    type: 'click',
                    listener: () => {
                        this.sendMessage();
                    }
                });

                chatModel
                    .getChats(userModel.getData().id)
                    .then((chatResponse) => {
                        if (chatResponse.ok) {
                            const chats = chatResponse.json.map((value: Context) => {
                                return {
                                    user: {
                                        name: value.partnerName,
                                        avatar: value.photo
                                    },
                                    lastMessage: {
                                        text: value.lastMessage,
                                        time: value.lastMessageTime
                                    },
                                    chatId: value.chatId
                                };
                            });
                            this.addChats(chats);
                        }
                    })
                    .catch((chatReason) => console.error('Chat error - ', chatReason));
            })
            .catch((reason) => {
                eventBus.emit(Events.routeChange, Routes.loginRoute);
                console.error('Auth - error: ', reason);
            });
    }

    finish(): void {
        this.emojeisListener.deleteListeners();
        this.activeChat = null;
    }

    setElements(): void {
        this.elements.chatsList = document.querySelector('.chats-list__list');
        this.elements.messageList = document.querySelector('.message-chat__list');
        this.elements.noChatsList = document.getElementById('chats-list__no-message');
        this.elements.noMessageList = document.getElementById('message-chat__no-message');
        this.elements.noChatSelectedList = document.getElementById('message-chat__no-chat-selected');
        this.elements.headerIcon = document.querySelector('.message-chat .message-header .icon');
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
        this.elements.writeBar = document.querySelector('.message-chat__writebar');
    }

    /**
     *
     * @param {{user:{name, avatar}, lastMessage:{text, time: String}, counter, chatId}[]} chats
     * @param {boolean} newChat
     */
    addChats(chats: IChatItem[], newChat?: boolean): void {
        if (!chats && chats.length === 0) {
            return;
        }

        chats.forEach((item) => {
            this.chats.push({ ...item });

            const tmpDiv = document.createElement('div');
            tmpDiv.innerHTML = new ChatItem(item).render();
            const tmp = <HTMLElement>tmpDiv.firstChild;

            if (item.chatId) {
                tmp.dataset.chatId = String(item.chatId);
            }

            let insertionElem: HTMLElement;
            if (newChat) {
                insertionElem = this.elements.chatsList.appendChild(tmp);
            } else {
                insertionElem = this.elements.chatsList.insertBefore(tmp, this.elements.chatsList.firstChild);
            }

            this.registerListener({
                element: insertionElem,
                type: 'click',
                listener: (e) => {
                    const currentElement = <HTMLElement>e.currentTarget;
                    this.openChat(Number(currentElement.dataset.chatId));
                }
            });
        });
        if (this.chats.length > 0) {
            this.elements.noChatsList.hidden = true;
        } else {
            this.elements.noChatsList.hidden = false;
        }
    }

    openChat(chatId: number): void {
        this.clearMessages();
        this.emojeisListener.deleteListeners();
        document.querySelectorAll('.cell').forEach((item: HTMLElement) => {
            item.style.backgroundColor = 'unset';
        });

        let currentChat: IChatItem;
        this.chats.forEach((item) => {
            if (item.chatId && item.chatId === chatId) {
                currentChat = item;
                const chatElement = <HTMLElement>document.querySelector(`div[data-chat-id="${item.chatId}"]`);
                if (chatElement) {
                    chatElement.style.backgroundColor = 'var(--field_background)';
                }
            }
        });

        if (!currentChat) {
            console.error('Нет чата в списке');
        }

        this.activeChat = currentChat;
        this.elements.headerIcon.src = currentChat.user.avatar;
        this.elements.headerTitle.innerHTML = currentChat.user.name;

        this.hiddenChat(false);

        chatModel.getMessages(this.activeChat.chatId).then((msgResponse) => {
            if (msgResponse.status === 401) {
                eventBus.emit(Events.routeChange, Routes.loginRoute);
                return;
            }
            if (msgResponse.ok) {
                const messages = msgResponse.json.map((value: Context) => {
                    return {
                        reaction: value.reactionId,
                        text: value.text,
                        messageId: value.messageId,
                        usersMessage: value.authorId === userModel.getData().id
                    };
                });
                this.addMessages(messages, true);
            }
        });
    }

    clearMessages(): void {
        this.hiddenChat(true);
        this.elements.messageList.innerHTML = '';
        this.messages = [];
    }

    /**
     * Отправка сообщения
     */
    sendMessage(): void {
        if (this.sendingMessage) {
            return;
        }
        const value = this.elements.writeBarInput.value;
        if (value.length === 0) {
            return;
        }

        this.setSendingMessage(true);

        chatModel
            .sendMessage(userModel.getData().id, this.activeChat.chatId, value)
            .finally(() => this.setSendingMessage(false))
            .then((messageResponse) => {
                if (messageResponse.status === 401) {
                    eventBus.emit(Events.routeChange, Routes.loginRoute);
                    return;
                }
                if (messageResponse.ok) {
                    this.elements.writeBarInput.value = '';
                    this.addMessages([{ text: value, usersMessage: true }], true);
                }
                if (!messageResponse.ok) {
                    eventBus.emit(Events.pushNotifications, {
                        before: new IconClass({
                            iconCode: IconsSrc.error_circle,
                            iconClasses: 'error-icon'
                        }).render(),
                        children: messageResponse.json.error
                    });
                }
            })
            .catch((messageReason) => console.error('Message error - ', messageReason));
    }

    /**
     * Отображает кнопку отправки сообщения или спиннер загрузки
     * @param {boolean} set
     */
    setSendingMessage(set?: boolean): void {
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
     * @param {IMessageItem} messageElem
     * @param {string} emojiId
     */
    setEmojis(message: IMessageItem, emojiId: keyof typeof EmojisList): void {
        chatModel
            .editMessage(this.activeChat.chatId, message.messageId, { reactionId: Number(emojiId) })
            .then((reactionResponse) => {
                if (reactionResponse.status === 401) {
                    eventBus.emit(Events.routeChange, Routes.loginRoute);
                    return;
                }
                if (reactionResponse.ok) {
                    message.reaction = emojiId;
                    this.editMessage(message);
                }
            })
            .catch((reactionReason) => console.error('Reactione error - ', reactionReason));
    }

    editMessage(message: IMessageItem): void {
        const element = document.querySelector(`div[data-message-id="${message.messageId}"]`);
        const iconElement = <HTMLElement>element.querySelector('.icon');
        const messageTextElement = <HTMLElement>element.querySelector('.message__text');

        if (iconElement) {
            iconElement.innerHTML = String(EmojisList[message.reaction]);
        }

        if (messageTextElement) {
            messageTextElement.innerHTML = message.text;
        }
    }

    /**
     *
     * @param {{text, usersMessage: Boolean, messageId}[]} messages
     * @param {Boolean} newMessages
     */
    addMessages(messages: IMessageItem[], newMessages?: boolean): void {
        const prevScrollHeight = this.elements.messageList.scrollHeight;

        if (!messages && messages.length === 0) {
            return;
        }

        messages.forEach((item) => {
            const newMessaage = this.messages.push({
                ...item
            });

            const tmpDiv = document.createElement('div');
            tmpDiv.innerHTML = new Message(item).render();
            const tmp = <HTMLElement>tmpDiv.firstChild;

            if (item.messageId) {
                tmp.dataset.messageId = String(item.messageId);
            }

            let insertionElem: HTMLElement;
            if (newMessages || this.elements.messageList.firstChild === null) {
                insertionElem = this.elements.messageList.appendChild(tmp);
            } else {
                insertionElem = this.elements.messageList.insertBefore(
                    tmp,
                    this.elements.messageList.firstChild
                );
            }

            if (!item.usersMessage) {
                this.emojeisListener.registerListener({
                    element: <HTMLElement>insertionElem.children[0],
                    type: 'click',
                    listener: () => {
                        new EmojisPopup((key: keyof typeof EmojisList) => {
                            this.setEmojis(this.messages[newMessaage - 1], key);
                        });
                    }
                });
            }
        });

        const newScrollHeight = this.elements.messageList.scrollHeight;

        if (newMessages) {
            this.elements.messageList.scrollTo({
                top: newScrollHeight,
                behavior: 'auto'
            });
        } else {
            this.elements.messageList.scrollTo({
                top: newScrollHeight - prevScrollHeight,
                behavior: 'auto'
            });
        }

        if (this.messages.length > 0) {
            this.elements.noMessageList.hidden = true;
        } else {
            this.elements.noMessageList.hidden = false;
        }
    }

    addNewMessageHandler(msg: IMessageSocketData): void {
        if (this.activeChat.chatId === msg.chatId) {
            this.addMessages(
                [
                    {
                        text: msg.text,
                        messageId: msg.messageId
                    }
                ],
                true
            );
        } else {
            eventBus.emit(Events.pushNotifications, {
                children: 'У вас новое сообщение'
            });
        }
    }

    addNewChatHandler(chat: IChatSocketData): void {
        if (this.elements.chatsList) {
            this.addChats([
                {
                    user: {
                        name: chat.partnerName,
                        avatar: backendLocation + '/images/' + String(chat.photos[0])
                    },
                    lastMessage: {
                        text: chat.lastMessage,
                        time: timeToStringByTime(new Date(chat.lastMessageTime * 1000))
                    },
                    chatId: chat.chatId
                }
            ]);
        } else {
            eventBus.emit(Events.pushNotifications, {
                children: 'У вас новый матч!'
            });
        }
    }

    /**
     * Прятает/показывает
     * @param {boolean} hidden
     */
    hiddenChat(hidden?: boolean): void {
        this.elements.writeBar.hidden = hidden;
        this.elements.header.style.visibility = hidden ? 'hidden' : 'unset';
        this.elements.messageList.hidden = hidden;
        this.elements.noChatSelectedList.hidden = !hidden;
    }

    /**
     * Возвращает добавленный спиннер
     * @returns {Object} DOMelement
     */
    getLoaderSpinner(): HTMLElement {
        const tmpDiv = document.createElement('div');
        tmpDiv.innerHTML = new Spinner({
            classes: 'gray-icon message-loader'
        }).render();
        return <HTMLElement>tmpDiv.firstChild;
    }
}

export default MessageController;

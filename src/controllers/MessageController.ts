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
import img from '@img/img.png';
import Context from '../utils/Context';

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

interface IChat extends IChatItem {
    elem?: HTMLElement;
}

interface IMessage extends IMessageItem {
    elem?: HTMLElement;
}

/**
 * @class
 * Контроллер логина
 */
class MessageController extends BaseController {
    activeChat: IChatItem = null;
    chats: IChat[] = [];
    messages: IMessage[] = [];
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
    }

    start(queryParams: Context): void {
        this.queryParams = queryParams;
        userModel
            .auth()
            .then((response) => {
                if (!response.ok) {
                    eventBus.emit(Events.routeChange, Routes.loginRoute);
                }
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

                this.registerListener({
                    element: this.elements.messageList,
                    type: 'scroll',
                    listener: (e) => {
                        const element = <HTMLElement>e.currentTarget;
                        if (element.scrollTop <= 350) {
                            this.onScrollTopChat();
                        }
                    }
                });

                this.registerListener({
                    element: this.elements.chatsList,
                    type: 'scroll',
                    listener: (e) => {
                        const element = <HTMLElement>e.currentTarget;
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
            })
            .catch((reason) => {
                eventBus.emit(Events.routeChange, Routes.loginRoute);
                console.error('Auth - error: ', reason);
            });
    }

    finish(): void {
        this.emojeisListener.deleteListeners();
    }

    setElements(): void {
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

    onScrollTopChat(): void {
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

    onScrollTopChats(): void {
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
    addChats(chats: IChatItem[]): void {
        chats.forEach((item) => {
            const tmpDiv = document.createElement('div');
            tmpDiv.innerHTML = new ChatItem(item).render();
            const tmp = <HTMLElement>tmpDiv.firstChild;

            if (item.chatId) {
                tmp.dataset.chatId = item.chatId;
            }

            const insertionElem = this.elements.chatsList.appendChild(tmp);
            this.chats.push({ ...item, elem: insertionElem });

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

    // updateChat(): void {}

    openChat(chatId: number): void {
        this.clearMessages();
        this.emojeisListener.deleteListeners();
        document.querySelectorAll('.cell').forEach((item: HTMLElement) => {
            item.style.backgroundColor = 'unset';
        });

        let currentChat: IChat;
        this.chats.forEach((item) => {
            if (item.chatId && item.chatId === chatId) {
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

        setTimeout(() => {
            this.setSendingMessage(false);
            this.elements.writeBarInput.value = '';
            this.addMessages([{ text: value, usersMessage: true }], true);
        }, 150);
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
     * @param {IMessage} messageElem
     * @param {string} emojieId
     */
    setEmojies(
        message: IMessage,
        emojieId: keyof typeof EmojisList
    ): void {
        const messageElem = message.elem;
        messageElem.children[0].children[0].innerHTML = EmojisList[emojieId];
    }

    /**
     *
     * @param {{text, usersMessage: Boolean, messageId}[]} messages
     * @param {Boolean} newMessages
     */
    addMessages(messages: IMessageItem[], newMessages?: boolean): void {
        const prevScrollHeight = this.elements.messageList.scrollHeight;

        messages.forEach((item) => {
            const tmpDiv = document.createElement('div');
            tmpDiv.innerHTML = new Message(item).render();
            const tmp = <HTMLElement>tmpDiv.firstChild;
            if (item.messageId) {
                tmp.dataset.messageId = item.messageId;
            }

            let insertionElem: HTMLElement;
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
                element: <HTMLElement>insertionElem.children[0],
                type: 'click',
                listener: () => {
                    new EmojisPopup((key: keyof typeof EmojisList) => {
                        this.setEmojies(item, key);
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

    // updateMessages(): void {}

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

    chatDemoContent: IChatItem[] = [
        {
            user: {
                avatar: img,
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
                avatar: img,
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
                avatar: img,
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
                avatar: img,
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
                avatar: img,
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
                avatar: img,
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
                avatar: img,
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
                avatar: img,
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
                avatar: img,
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
                avatar: img,
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
                avatar: img,
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
                avatar: img,
                name: 'Не Красивое имя'
            },
            lastMessage: {
                text: 'Приветик',
                time: '2 м'
            },
            chatId: 12
        }
    ];

    messageDemoContent: IMessageItem[] = [
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
}

export default MessageController;

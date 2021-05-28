import HttpRequests from '../utils/requests';
import { parseJson, IResponseData, timeToStringByTime, updateChat } from '../utils/helpers';
import Context from '../utils/Context';
import eventBus from '../utils/eventBus';
import Events from '../consts/events';
import { IChatSocketData, IMessageSocketData } from '../utils/WebSocketListener';
import { imageStorageLocation } from '@config';

export interface IChat {
    chatId: number;
    partnerId: number;
    partnerName: string;
    lastMessage: string;
    lastMessageTime: number;
    photo: number;
    isOpened: boolean;
}

export interface IChatMessage {
    messageId?: number;
    authorId?: number;
    chatId?: number;
    text?: string;
    date?: number;
    reactionId?: number;
    messageOrder?: number;
}

interface IChatMessages {
    [key: number]: IChatMessage[];
}

class ChatModel {
    static instance: ChatModel = null;
    uid = 1;
    chats: IChat[] = [];
    chatMessages: IChatMessages = {};

    static getInstance() {
        if (!ChatModel.instance) {
            ChatModel.instance = new ChatModel();
        }

        return ChatModel.instance;
    }

    constructor() {
        eventBus.connect(Events.newMessage, this.addNewMessageHandler.bind(this));
        eventBus.connect(Events.newChat, this.addNewChatHandler.bind(this));
        eventBus.connect(Events.messageChanged, this.updateMessageHandler.bind(this));
    }

    deleteChatById(chatId: number) {
        return HttpRequests.delete('/chats/' + chatId, {})
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    this.chats = this.chats.filter((chat) => chat.chatId !== chatId);
                }

                return response;
            });
    }

    changeSecretAlbumStatus(chatId: number, isOpened: boolean): void {
        updateChat(this.chats, {
            chatId: chatId,
            isOpened: isOpened
        });
    }

    addNewMessageHandler(msg: IMessageSocketData) {
        const newMessage: IChatMessage = {
            messageId: msg.messageId,
            authorId: msg.authorId,
            chatId: msg.chatId,
            text: msg.text,
            date: msg.date * 1000,
            reactionId: msg.reactionId,
            messageOrder: msg.messageOrder
        };

        if (this.chatMessages[newMessage.chatId]) {
            this.chatMessages[newMessage.chatId].push(newMessage);
        }
        updateChat(this.chats, {
            chatId: newMessage.chatId,
            lastMessage: newMessage.text,
            lastMessageTime: newMessage.date
        });
    }

    addNewChatHandler(chat: IChatSocketData) {
        const newChat: IChat = {
            isOpened: false,
            chatId: chat.chatId,
            partnerId: chat.partnerId,
            partnerName: chat.partnerName,
            lastMessage: chat.lastMessage,
            lastMessageTime: chat.lastMessageTime,
            photo: chat.photos[0]
        };

        this.chats.push(newChat);
    }

    updateMessageHandler(msg: IMessageSocketData) {
        if (!this.chatMessages[msg.chatId]) {
            return;
        }

        for (const chatMsg of this.chatMessages[msg.chatId]) {
            if (chatMsg.messageId === msg.messageId) {
                chatMsg.reactionId = msg.reactionId - 1;
                chatMsg.text = msg.text;
                break;
            }
        }
    }

    resetChats(): void {
        this.uid = 1;
        this.chats = [];
        this.chatMessages = {};
    }

    editMessage(chatId: number, msgId: number, msg: IChatMessage): Promise<IResponseData> {
        msg.reactionId += 1;
        return HttpRequests.patch('/messages/' + msgId, msg)
            .then(parseJson)
            .then((response) => {
                if (response.ok && 'reactionId' in msg && this.chatMessages[chatId]) {
                    this.chatMessages[chatId].forEach((chatMsg, i) => {
                        if (chatMsg.messageId === msgId) {
                            this.chatMessages[chatId][i].reactionId = msg.reactionId - 1;
                        }
                    });
                }
                return response;
            });
    }

    sendMessage(uid: number, chatId: number, text: string): Promise<IResponseData> {
        if (uid !== this.uid) {
            return Promise.resolve({
                status: 403,
                ok: false,
                json: { error: 'Пользователь пытается представиться тем, кем он не является' }
            });
        }

        return HttpRequests.post('/chats/' + String(chatId) + '/messages', { authorId: this.uid, text: text })
            .then(parseJson)
            .then((response) => {
                if (response.ok && this.chatMessages[chatId]) {
                    response.json = {
                        ...response.json,
                        date: response.json.date * 1000
                    };
                    this.chatMessages[chatId].push(response.json);
                    updateChat(this.chats, {
                        chatId: response.json.chatId,
                        lastMessage: response.json.text,
                        lastMessageTime: response.json.date
                    });
                }

                return response;
            });
    }

    getMessages(chatId: number): Promise<IResponseData> {
        if (this.chatMessages[chatId]) {
            return Promise.resolve({
                status: 200,
                ok: true,
                json: this.chatMessages[chatId]
            });
        }
        const offset = 0;
        const count = 100;

        return HttpRequests.get(
            '/chats/' + String(chatId) + '/messages?offset=' + String(offset) + '&count=' + String(count)
        )
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    response.json = response.json.map((msg: Context) => {
                        return {
                            ...msg,
                            date: msg.date * 1000,
                            reactionId: msg.reactionId - 1
                        };
                    });
                    this.chatMessages[chatId] = response.json;
                }

                return response;
            });
    }

    getChats(uid: number): Promise<IResponseData> {
        if (this.chats.length !== 0 && uid === this.uid) {
            return Promise.resolve({
                status: 200,
                ok: true,
                json: this.chats.map((chat: Context) => ({
                    ...chat,
                    lastMessageTime: timeToStringByTime(new Date(chat.lastMessageTime)),
                    photo: imageStorageLocation + '/' + chat.photo
                }))
            });
        }
        const offset = 0;
        const count = 100;

        return HttpRequests.get(
            '/users/' + String(uid) + '/chats?offset=' + String(offset) + '&count=' + String(count)
        )
            .then(parseJson)
            .then((response) => {
                if (response.ok) {
                    this.uid = uid;
                    this.chats = response.json.map((chat: Context) => {
                        return {
                            isOpened: chat.isOpened,
                            chatId: chat.chatId,
                            partnerId: chat.partnerId,
                            partnerName: chat.partnerName,
                            lastMessage: chat.lastMessage,
                            lastMessageTime: chat.lastMessageTime ? chat.lastMessageTime * 1000 : undefined,
                            photo: chat.photos[0]
                        };
                    });
                    response.json = this.chats.map((chat: Context) => {
                        return {
                            ...chat,
                            lastMessageTime: timeToStringByTime(new Date(chat.lastMessageTime)),
                            photo: imageStorageLocation + '/' + chat.photo
                        };
                    });
                }

                return Promise.resolve(response);
            });
    }
}

export default ChatModel.getInstance();

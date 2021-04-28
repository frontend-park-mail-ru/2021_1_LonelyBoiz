import HttpRequests from '../utils/requests';
import { parseJson, IResponseData, timeToStringByTime } from '../utils/helpers';
import Context from '../utils/Context';
import backendLocation from '../consts/config';
import eventBus from '../utils/eventBus';
import Events from '../consts/events';
import { IChatSocketData, IMessageSocketData } from '../utils/WebSocketListener';

export interface IChat {
    chatId: number;
    partnerId: number;
    partnerName: string;
    lastMessage: string;
    lastMessageTime: number;
    photo: number;
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
    }

    addNewMessageHandler(msg: IMessageSocketData) {
        const newMessage: IChatMessage = {
            messageId: msg.messageId,
            authorId: msg.authorId,
            chatId: msg.chatId,
            text: msg.text,
            date: Number(msg.date),
            reactionId: msg.reactionId,
            messageOrder: msg.messageOrder
        };

        this.chatMessages[msg.chatId].push(newMessage);
    }

    addNewChatHandler(chat: IChatSocketData) {
        const newChat: IChat = {
            chatId: chat.chatId,
            partnerId: chat.partnerId,
            partnerName: chat.partnerName,
            lastMessage: chat.lastMessage,
            lastMessageTime: chat.lastMessageTime,
            photo: chat.photos[0]
        };
        this.chats.push(newChat);
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
                    this.chatMessages[chatId].forEach((msg, i) => {
                        if (msg.messageId === msgId) {
                            this.chatMessages[chatId][i] = msg.reactionId;
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
                    this.chatMessages[chatId].push(response.json);
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
                    response.json = response.json.map((msg) => {
                        return {
                            ...msg,
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
                json: this.chats
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
                            chatId: chat.chatId,
                            partnerId: chat.partnerId,
                            partnerName: chat.partnerName,
                            lastMessage: chat.lastMessage,
                            lastMessageTime: timeToStringByTime(new Date(chat.lastMessageTime * 1000)),
                            photo: backendLocation + '/images/' + String(chat.photos[0])
                        };
                    });
                    response.json = this.chats;
                }

                return Promise.resolve(response);
            });
    }
}

export default ChatModel.getInstance();

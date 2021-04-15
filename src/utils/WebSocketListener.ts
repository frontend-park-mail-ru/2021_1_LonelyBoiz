import { websocketLocation } from '../consts/config';
import eventBus from './eventBus';
import Events from '../consts/events';
import Context from './Context';

interface IHandlers {
    [key: string]: Function
}

class WebSocketListener {
    static instance: WebSocketListener = null;
    webSocket: WebSocket = null;
    handlers: IHandlers = {};
    pingInterval: ReturnType<typeof setInterval> = null;

    constructor() {
        this.handlers.message = addMessageHandler;
        this.handlers.chat = addChatHandler;
    }

    static getInstance() {
        if (!WebSocketListener.instance) {
            WebSocketListener.instance = new WebSocketListener();
        }

        return WebSocketListener.instance;
    }

    listen() {
        if (this.webSocket === null) {
            this.webSocket = new WebSocket(websocketLocation);
            this.webSocket.addEventListener('message', this.onMessageEvent.bind(this));
            this.pingInterval = setInterval(this.ping.bind(this), 30 * 1000);
        }
    }

    stop() {
        if (this.webSocket !== null) {
            this.webSocket.removeEventListener('message', this.onMessageEvent);
            this.webSocket.close();
            this.webSocket = null;

            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }

    ping() {
        this.webSocket.send('{type: \'ping\', obj: {}}');
    }

    onMessageEvent(e: Context) {
        const data = JSON.parse(e.data);
        if (this.handlers[data.type]) {
            this.handlers[data.type](data.obj);
        }
    }
}

export interface IMessageSocketData {
    messageId: number,
    authorId?: number,
    chatId: number,
    text?: string,
    date?: Date,
    reactionId?: number,
    messageOrder?: number,
}

export interface IChatSocketData {
    chatId: number,
    partnerId: number,
    partnerName: string,
    lastMessage?: string,
    lastMessageTime?: number,
    lastMessageAuthorId?: number
    photos: number[],
}

function addMessageHandler(data: IMessageSocketData) {
    eventBus.emit(Events.newMessage, data);
}

function addChatHandler(data: IChatSocketData) {
    eventBus.emit(Events.newChat, data);
}

export default WebSocketListener.getInstance();

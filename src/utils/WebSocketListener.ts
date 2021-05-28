import { websocketLocation } from '@config';
import eventBus from './eventBus';
import Events from '../consts/events';
import Context from './Context';
import { RETRYING_CONN_N, PING_INTERVAL_SEC } from '../consts/socket';

interface IHandlers {
    [key: string]: Function
}

class WebSocketListener {
    static instance: WebSocketListener = null;
    webSocket: WebSocket = null;
    handlers: IHandlers = {};
    pingInterval: ReturnType<typeof setInterval> = null;
    errorCounter = 0;

    constructor() {
        this.handlers.message = addMessageHandler;
        this.handlers.chat = addChatHandler;
        this.handlers.editMessage = addEditMessageHandler;
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
            this.webSocket.addEventListener('open', this.onOpenEvent.bind(this));
            this.webSocket.addEventListener('message', this.onMessageEvent.bind(this));
            this.webSocket.addEventListener('error', this.onErrorEvent.bind(this));
            this.pingInterval = setInterval(this.ping.bind(this), PING_INTERVAL_SEC * 1000);
        }
    }

    stop() {
        if (this.webSocket !== null) {
            this.webSocket.removeEventListener('open', this.onOpenEvent);
            this.webSocket.removeEventListener('message', this.onMessageEvent);
            this.webSocket.removeEventListener('error', this.onErrorEvent);
            this.webSocket.close();
            this.webSocket = null;

            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }

    ping() {
        this.webSocket.send('{type: \'ping\', obj: {}}');
    }

    onOpenEvent() {
        this.errorCounter = 0;
    }

    onErrorEvent() {
        if (this.errorCounter < RETRYING_CONN_N) {
            this.stop();
            this.listen();
            this.errorCounter += 1;

            return;
        }

        console.error('Failed to establish websocket connection');
        this.stop();
        this.errorCounter = 0;
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
    date?: number,
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

function addEditMessageHandler(data: IMessageSocketData) {
    eventBus.emit(Events.messageChanged, data);
}

export default WebSocketListener.getInstance();

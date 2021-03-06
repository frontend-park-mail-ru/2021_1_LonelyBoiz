import Context from './Context';
import { INotificationsPush } from './Notifications';
import { IChatSocketData, IMessageSocketData } from './WebSocketListener';

type eventEmitData = Context | string | INotificationsPush | IMessageSocketData | IChatSocketData | void;

/**
 * @class
 * Объект синглтон для управления ивентами
 */
class EventBus {
    static instance: EventBus = null;
    map = new Map();

    /**
     * Выдает экземпляр синглтона. В случае отсутствия - создает
     *
     * @return {EventBus} экземпляр объекта
     */
    static getInstance(): EventBus {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }

        return EventBus.instance;
    }

    /**
     * Привязывает обработчик к событию
     *
     * @param  {string} event - Кастомное событие
     * @param  {Function} callback - Обработчик, который привязывается к событию
     */
    connect(event: string, callback: Function): void {
        if (this.map.has(event)) {
            this.map.get(event).add(callback);
        } else {
            const set = new Set();
            set.add(callback);
            this.map.set(event, set);
        }
    }

    /**
     * Отвязывает обработчик от события
     *
     * @param  {string} event - Кастомное событие
     * @param  {Function} callback - Обработчик, который отвязывается от события
     */
    disconnect(event: string, callback: Function): void {
        if (this.map.has(event)) {
            this.map.get(event).delete(callback);
        }
    }

    /**
     * Вызывает все обработчики события
     *
     * @param  {string} event - Кастомное событие
     * @param  {eventEmitData} data - Данные для обработчиков
     */
    emit(event: string, data: eventEmitData = {}): void {
        if (this.map.has(event)) {
            this.map.get(event).forEach((callback: Function) => {
                callback(data);
            });
        }
    }
}

export default EventBus.getInstance();

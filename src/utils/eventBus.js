/**
 * @class
 * Объект синглтон для управления ивентами
 */
class EventBus {
    static instance = null;

    /**
     * Создает экземпляр EventBus
     *
     * @constructor
     * @this  {EventBus}
     */
    constructor () {
        this.map = new Map();
    }

    /**
     * Выдает экземпляр синглтона. В случае отсутствия - создает
     *
     * @return {EventBus} экземпляр объекта
     */
    static getInstance () {
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
    connect (event, callback) {
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
    disconnect (event, callback) {
        if (this.map.has(event)) {
            this.map.get(event).delete(callback);
        }
    }

    /**
     * Вызывает все обработчики события
     *
     * @param  {string} event - Кастомное событие
     * @param  {Object} data - Данные для обработчиков
     */
    emit (event, data = {}) {
        if (this.map.has(event)) {
            this.map.get(event).forEach((callback, _) => {
                callback(data);
            });
        }
    }
}

export default EventBus.getInstance();

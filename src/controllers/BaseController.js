/**
 * @class
 * Базовый контроллер
 */
class BaseController {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {BaseController}
     * @param {View} view страница для отображения
     */
    constructor(view) {
        this.view = view;
        this.eventListeners = [];
        this.storage = window.localStorage;
    }

    /**
     * Запускает контроллер
     */
    start() {
        this.view.show();
    }

    /**
     * Завершает контроллер
     */
    finish() {
        this.deleteListeners();
    }

    /**
     * Цепляет обработчик к событию и сохранят его
     *
     * @params {Object} subscriber объект, который хранит в себе информацию о владельце
     */
    registerListener(subscriber) {
        subscriber.element.addEventListener(subscriber.type, subscriber.listener);
        this.eventListeners.push(subscriber);
    }

    /**
     * Удаляет все обработчики, добавленные контроллером
     */
    deleteListeners() {
        this.eventListeners = this.eventListeners.reduce((empty, curr) => {
            curr.element.removeEventListener(curr.type, curr.listener);
            return empty;
        }, []);
    }
}

export default BaseController;

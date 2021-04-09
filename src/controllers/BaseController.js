import Listener from '../utils/Listener.js';

/**
 * @class
 * Базовый контроллер
 */
class BaseController extends Listener {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {BaseController}
     * @param {View} view страница для отображения
     */
    constructor(view) {
        super();
        this.view = view;
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
}

export default BaseController;

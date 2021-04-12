import Listener from '../utils/Listener';
import AppStorage from '../utils/AppStorage';
import BaseView from '../view/BaseView';

interface IBaseController {
    view: BaseView;
}

/**
 * @class
 * Базовый контроллер
 */
class BaseController extends Listener {
    view: BaseView;
    storage = AppStorage;
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {BaseController}
     * @param {View} view страница для отображения
     */
    constructor({ view }: IBaseController): void {
        super();
        this.view = view;
    }

    /**
     * Запускает контроллер
     */
    start(): void {
        this.view.show();
    }

    /**
     * Завершает контроллер
     */
    finish(): void {
        this.deleteListeners();
    }
}

export default BaseController;

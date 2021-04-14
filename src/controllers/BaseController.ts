import Listener from '../utils/Listener';
import AppStorage from '../utils/AppStorage';
import BaseView from '../view/BaseView';
import Context from '../utils/Context';

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
    queryParams: Context = {};
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {BaseController}
     * @param {View} view страница для отображения
     */
    constructor({ view }: IBaseController) {
        super();
        this.view = view;
    }

    /**
     * Запускает контроллер
     */
    start(queryParams: Context): void {
        this.queryParams = queryParams;
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

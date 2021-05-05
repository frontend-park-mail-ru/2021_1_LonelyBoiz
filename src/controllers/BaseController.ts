import Listener from '../utils/Listener';
import AppStorage from '../utils/AppStorage';
import BaseView from '../view/BaseView';
import Context from '../utils/Context';
import eventBus from '../utils/eventBus';
import Events from '../consts/events';
import Routes from '../consts/routes';
import userModel, { IUserModel } from '../models/UserModel';
import Views from '../consts/views';
import webSocketListener from '../utils/WebSocketListener';

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
    start(queryParams?: Context): void {
        this.queryParams = queryParams;
    }

    auth(): Promise<void> {
        return userModel.auth().then((response: Response) => {
            const json = response.json as IUserModel;

            if (this.view.view === Views.Login || this.view.view === Views.SignUp) {
                return;
            }

            if (!response.ok || (json && json.error)) {
                eventBus.emit(Events.routeChange, Routes.loginRoute);
                return Promise.reject(new Error('Not authorized'));
            }

            if (userModel.isActive() !== true && this.view.view !== Views.PreSettings) {
                eventBus.emit(Events.routeChange, Routes.preSettingsRoute);
                return Promise.reject(new Error('Not activated'));
            }
            webSocketListener.listen();
        });
    }

    /**
     * Завершает контроллер
     */
    finish(): void {
        this.deleteListeners();
    }
}

export default BaseController;

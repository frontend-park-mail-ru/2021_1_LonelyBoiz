import Listener from '../utils/Listener';
import AppStorage from '../utils/AppStorage';
import BaseView from '../view/BaseView';
import Context from '../utils/Context';
import eventBus from '../utils/eventBus';
import Events from '../consts/events';
import Routes from '../consts/routes';
import userModel from '../models/UserModel';
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
    start(queryParams: Context): void {
        this.queryParams = queryParams;
    }

    auth(): Promise<void> {
        return new Promise((resolve, reject) => {
            userModel
                .auth()
                .then((response: Response) => {
                    webSocketListener.listen();
                    eventBus.emit(Events.updateAvatar);

                    const json = response.json;

                    if (this.view.view === Views.Login || this.view.view === Views.SignUp) {
                        resolve();
                        return;
                    }

                    if (!response.ok || (json && json.error)) {
                        eventBus.emit(Events.routeChange, Routes.loginRoute);
                        reject(new Error('Not authorized'));
                        return;
                    }

                    if (userModel.isActive() !== true && this.view.view !== Views.PreSettings) {
                        eventBus.emit(Events.routeChange, Routes.preSettingsRoute);
                        reject(new Error('Not activated'));
                    }

                    resolve();
                });
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

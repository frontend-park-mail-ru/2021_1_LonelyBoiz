import Routes from '../consts/routes.js';
import Events from '../consts/events.js';
import eventBus from '../utils/eventBus.js';

/**
 * @class
 * Роутер для навигации в приложении
 */
class Router {
    /**
     * Создает экземпляр роутера
     *
     * @constructor
     * @this  {Router}
     */
    constructor() {
        this.routes = new Map();
        this.controller = null;
        eventBus.connect(Events.routeChange, this.changeRoute.bind(this));
    }

    /**
     * Изменить путь
     *
     * @params {String} route путь до
     */
    changeRoute(route) {
        let controller = this.routes.get(route);
        let chosenRoute = route;

        if (!controller) {
            controller = this.routes.get(Routes.homeRoute);
            chosenRoute = Routes.homeRoute;
            if (!controller) { return; }
        }

        if (this.controller === null) {
            this.controller = controller;
        } else {
            this.controller.finish();
            this.controller = controller;
        }

        document.location.hash = chosenRoute;
        this.controller.start();
    }

    /**
     * Добавить роут и связать его с контроллером
     *
     * @params {String} route путь страницы
     * @params {Object} controller контроллер страницы
     */
    addRoute(route, controller) {
        this.routes.set(route, controller);
    }
}

export default Router;

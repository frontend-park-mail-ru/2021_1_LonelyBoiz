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
        this.currPath = null;
        this.controller = null;
        eventBus.connect(Events.routeChange, this.changeRoute.bind(this));

        document.getElementById('app').addEventListener('click', (e) => {
            if (e.target.dataset.routlink) {
                e.preventDefault();
                this.changeRoute(e.target.dataset.routlink);
            }
        });

        window.onpopstate = function(e) {
            this.setupPage(e.target.location.pathname + e.target.location.search);
        }.bind(this);
    }

    /**
     *
     *  Точка входа в роутер.
     * Отображает страницу с запрошенным url
     *
     */
    start() {
        this.setupPage(window.location.pathname + window.location.search);
        window.history.replaceState(null, null, this.currPath);
    }

    /**
     * Изменить путь
     *
     * @params {String} path путь до
     */
    changeRoute(path) {
        this.setupPage(path);
        if (window.location.pathname + window.location.search !== this.currPath) {
            window.history.pushState(null, null, this.currPath);
        } else {
            window.history.replaceState(null, null, this.currPath);
        }
    }

    /**
     * Вспомогательная функция для изменения пути
     *
     * @params {String} path путь до
     */
    setupPage(path) {
        this.currPath = path;

        path = this.parsePath(path);
        const route = path.route;

        let controller = this.routes.get(route);

        if (!controller) {
            controller = this.routes.get(Routes.homeRoute);
            this.currPath = Routes.homeRoute;
            if (!controller) {
                return;
            }
        }

        if (this.controller === null) {
            this.controller = controller;
        } else {
            this.controller.finish();
            this.controller = controller;
        }

        if (!window.localStorage.getItem('u-id') &&
        this.parsePath(this.currPath).route !== Routes.loginRoute &&
        this.parsePath(this.currPath).route !== Routes.signupRoute) {
            this.currPath = Routes.loginRoute;
            this.controller = this.routes.get(this.parsePath(this.currPath).route);
        }

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

    /**
     * Разъеденить роут и query параметры
     *
     * @params {String} path путь страницы
     *
     * @return {Object} возвращает объект вида {route: String, query: String}
     */
    parsePath(path) {
        path = path.split('?');
        if (path.length > 1) {
            return { route: path[0], query: path[1] };
        }

        return { route: path[0], query: '' };
    }
}

export default Router;

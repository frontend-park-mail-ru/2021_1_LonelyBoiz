import Routes from '../consts/routes';
import Events from '../consts/events';
import eventBus from '../utils/eventBus';
import userModel from '../models/UserModel';
import BaseController from '../controllers/BaseController';

interface IPath {
    route: string;
    query: string;
}

/**
 * @class
 * Роутер для навигации в приложении
 */
class Router {
    routes = new Map();
    currPath: string = null;
    controller: BaseController = null;
    /**
     * Создает экземпляр роутера
     *
     * @constructor
     * @this  {Router}
     */
    constructor() {
        eventBus.connect(Events.routeChange, this.changeRoute.bind(this));

        document
            .getElementById('app')
            .addEventListener('click', (e: MouseEvent) => {
                const currentTarget = <HTMLElement>e.target;
                if (currentTarget.dataset.routlink) {
                    e.preventDefault();
                    this.changeRoute(currentTarget.dataset.routlink);
                }
            });

        window.onpopstate = function(e) {
            this.setupPage(
                e.target.location.pathname + e.target.location.search
            );
        }.bind(this);
    }

    /**
     *
     *  Точка входа в роутер.
     * Отображает страницу с запрошенным url
     *
     */
    start(): void {
        this.setupPage(window.location.pathname + window.location.search);
        window.history.replaceState(null, null, this.currPath);
    }

    /**
     * Изменить путь
     *
     * @params {String} path путь до
     */
    changeRoute(path: string): void {
        this.setupPage(path);
        if (
            window.location.pathname + window.location.search !==
            this.currPath
        ) {
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
    setupPage(path: string): void {
        this.currPath = path;

        const splitedPath = this.parsePath(path);
        const queryParams = this.queryParamsToObject(splitedPath.query);
        const route = splitedPath.route;

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

        if (
            userModel.isAuthorized() === false &&
            this.parsePath(this.currPath).route !== Routes.loginRoute &&
            this.parsePath(this.currPath).route !== Routes.signupRoute
        ) {
            this.currPath = Routes.loginRoute;
            this.controller = this.routes.get(
                this.parsePath(this.currPath).route
            );
        }

        this.controller.start(queryParams);
    }

    /**
     * Добавить роут и связать его с контроллером
     *
     * @params {String} route путь страницы
     * @params {Object} controller контроллер страницы
     */
    addRoute(route: string, controller: BaseController): void {
        this.routes.set(route, controller);
    }

    /**
     * Разъеденить роут и query параметры
     *
     * @params {String} path путь страницы
     *
     * @return {Object} возвращает объект вида {route: String, query: String}
     */
    parsePath(path: string): IPath {
        const splitedPath = path.split('?');
        if (splitedPath.length > 1) {
            return { route: splitedPath[0], query: splitedPath[1] };
        }

        return { route: splitedPath[0], query: '' };
    }

    queryParamsToObject(query) {
        query = new URLSearchParams(query);
        const obj = {};
        for (const pair of query.entries()) {
            obj[pair[0]] = pair[1];
        }

        return obj;
    }
}

export default Router;

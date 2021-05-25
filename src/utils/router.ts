import Routes from '../consts/routes';
import Events from '../consts/events';
import eventBus from '../utils/eventBus';
import userModel from '../models/UserModel';
import BaseController from '../controllers/BaseController';
import Context from './Context';

interface IPath {
    route: string;
    query: string;
}

interface IQueryUpdateOptions {
    queryObj: Context;
    isNewState?: boolean;
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
        eventBus.connect(Events.queryChange, this.updateQuery.bind(this));

        document
            .getElementById('app')
            .addEventListener('click', (e: MouseEvent) => {
                const currentTarget = <HTMLElement>e.target;
                if (currentTarget.dataset.routlink) {
                    e.preventDefault();
                    this.changeRoute(currentTarget.dataset.routlink);
                }
            });

        window.onpopstate = function(e: Context) {
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
        const route = splitedPath.route;
        const queryParams = this.parseParams(splitedPath.query);

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
     * Обновляет query параметры, изменяя текущее состояние, либо добавляя новое
     *
     * @params {Object}  queryObj объект с query параметрами
     * @params {boolean}  isNewState определяет, будет ли создаваться новое состояние
     */
    updateQuery(options: IQueryUpdateOptions): void {
        const queryObj = options.queryObj;
        const isNewState = options.isNewState ? options.isNewState : false;

        const query = new URLSearchParams(window.location.search);
        for (const [key, value] of Object.entries(queryObj)) {
            query.set(key, <string>value);
        }
        if (isNewState) {
            history.pushState(null, null, '?' + query.toString());
        } else {
            history.replaceState(null, null, '?' + query.toString());
        }
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

    /**
     * Парсит query параметры
     *
     * @params {String} query параметры
     *
     * @return {Object} возвращает query параметры в виде объекта
     */
    parseParams(queryString: string): Context {
        const params = new URLSearchParams(queryString);

        let obj = {};

        for (const key of params.keys()) {
            if (params.getAll(key).length > 1) {
                obj = {
                    ...obj,
                    [key]: params.getAll(key)
                };
            } else {
                obj = {
                    ...obj,
                    [key]: params.get(key)
                };
            }
        }

        return obj;
    }
}

export default Router;

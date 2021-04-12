import Events from '../consts/events';
import eventBus from '../utils/eventBus';
import Header from '../components/Header/Header';
import Tabbar from '../components/Tabbar/Tabbar';
import HeadersItems from '../consts/headersItems';
import Routes from '../consts/routes';
import { IconsSrc } from '../consts/icons';
import Listener from '../utils/Listener';
import Views from '../consts/views';
import Context from '../utils/Context';

export type Template = (context: Context) => string;

interface IBaseView {
    view?: string;
    template?: Template;
    context?: Context;
}

interface IIconHeader {
    route?: string;
    iconCode?: string;
    idDiv?: string;
    idHref?: string;
}

interface IIconHeaderList {
    [key: string]: IIconHeader;
}

/**
 * @class
 * Базовый шаблон
 */
class BaseView extends Listener {
    view: string;
    iconList: IIconHeaderList = {
        home: {
            route: Routes.homeRoute,
            iconCode: IconsSrc.home_stroke,
            idDiv: `home-icon__${Views.Home}`,
            idHref: `home-icon__${Views.Home}__href`
        },
        messages: {
            route: Routes.messageRoute,
            iconCode: IconsSrc.send_message_stroke,
            idDiv: `home-icon__${Views.Messages}`,
            idHref: `home-icon__${Views.Messages}__href`
        },
        settings: {
            route: Routes.settingsRoute,
            iconCode: IconsSrc.settings,
            idDiv: `home-icon__${Views.Settings}`,
            idHref: `home-icon__${Views.Settings}__href`
        },
        preSettings: {
            route: Routes.preSettingsRoute,
            iconCode: IconsSrc.settings,
            idDiv: `home-icon__${Views.PreSettings}`,
            idHref: `home-icon__${Views.PreSettings}__href`
        }
    };

    context: Context = {};
    template: Template;
    root: HTMLElement = null;
    /**
     * Создает экземпляр
     *
     * @constructor
     * @this  {BaseView}
     * @param {IBaseView} Views enum страницы для отображения
     */
    constructor({ view, template, context }: IBaseView) {
        super();
        this.view = view;
        this.template = <Template>template;
        this.context = context || {};

        this.showHeader();
        this.root = <HTMLElement>document.getElementById('app-content');
    }

    /**
     * Отображает шапку сайта
     */
    showHeader(): void {
        if (document.getElementById('app-content') !== null) {
            return;
        }
        const app = document.getElementById('app');

        const appContent = document.createElement('div');
        appContent.id = 'app-content';
        appContent.classList.add('full-screen');
        app.appendChild(appContent);

        const header = document.createElement('div');
        header.id = 'header';
        header.innerHTML = new Header({
            Tabbar: new Tabbar({
                icons: [
                    ...Object.entries(this.iconList).map((item) => {
                        const [, icon] = item;
                        return {
                            idHref: icon.idHref,
                            icon: {
                                href: icon.route,
                                size: 28,
                                iconCode: icon.iconCode,
                                idDiv: icon.idDiv,
                                iconClasses: 'js__header-icon'
                            }
                        };
                    }),
                    {
                        icon: {
                            iconClasses: 'avatar u-avatar-header',
                            size: 28,
                            src: window.localStorage.getItem('u-avatar')
                        }
                    }
                ]
            }).render(),
            activeIcon: HeadersItems.home
        }).render();

        switch (this.view) {
        case Views.Login:
        case Views.SignUp:
        case Views.PreSettings:
            header.hidden = true;
            break;
        }

        app.appendChild(header);

        Object.entries(this.iconList).forEach((item) => {
            const [, icon] = item;
            this.registerListener({
                element: document.getElementById(icon.idHref),
                type: 'click',
                listener: (e) => {
                    e.preventDefault();
                    eventBus.emit(Events.routeChange, icon.route);
                }
            });
        });
    }

    /**
     * Отображает страницу
     */
    show(): void {
        const headerElement = document.getElementById('header');

        switch (this.view) {
        case Views.Login:
        case Views.SignUp:
        case Views.PreSettings:
            headerElement.hidden = true;
            break;
        default: {
            headerElement.hidden = false;
            Object.entries(
                document.getElementsByClassName('js__header-icon')
            ).forEach((item) => {
                const [, element] = item;
                element.classList.add('active-icon');
                element.classList.remove('disable-icon');
            });
            const element = document.getElementById(
                `home-icon__${this.view}`
            );

            element.classList.add('disable-icon');
            element.classList.remove('active-icon');
            break;
        }
        }
    }
}

export default BaseView;

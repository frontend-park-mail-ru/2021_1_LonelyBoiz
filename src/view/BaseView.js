import Header from '../components/Header/Header.js';
import Tabbar from '../components/Tabbar/Tabbar.js';
import HeadersItems from '../consts/headersItems.js';
import Routes from '../consts/routes.js';
import { IconsSrc } from '../consts/icons.js';
import Listener from '../utils/Listener.js';

import Views from '../consts/views.js';

import Events from '../consts/events.js';
import eventBus from '../utils/eventBus.js';

/**
 * @class
 * Базовый шаблон
 */
class BaseView extends Listener {
    /**
     * Создает экземпляр
     *
     * @constructor
     * @this  {BaseView}
     * @param {Views} Views enum страницы для отображения
     */
    constructor(view) {
        super();
        this.view = view;
        this.iconList = {
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
            }
        };
        this.showHeader();
        this.context = {};
        this.root = document.getElementById('app-content');
    }

    /**
     * Отображает шапку сайта
     */
    showHeader() {
        if (!document.getElementById('app-content')) {
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
                                href: icon.route,
                                size: 28,
                                iconCode: icon.iconCode,
                                idDiv: icon.idDiv,
                                idHref: icon.idHref,
                                iconClasses: 'js__home-icon'
                            };
                        }),
                        {
                            href: Routes.homeRoute,
                            iconClasses: 'avatar u-avatar-header',
                            size: 28,
                            src: window.localStorage.getItem('u-avatar')
                        }
                    ]
                }).render(),
                activeIcon: HeadersItems.home
            }).render();

            switch (this.view) {
            case Views.Login:
            case Views.SignUp:
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
    }

    /**
     * Отображает страницу
     */
    show() {
        switch (this.view) {
        case Views.Login:
        case Views.SignUp:
            document.getElementById('header').hidden = true;
            break;
        default:
            document.getElementById('header').hidden = false;
            Object.entries(
                document.getElementsByClassName('js__home-icon')
            ).forEach((item) => {
                const [, element] = item;
                element.style.setProperty(
                    'color',
                    'var(--primary-text-color)'
                );
            });
            document
                .getElementById(`home-icon__${this.view}`)
                .style.setProperty('color', 'var(--muted-text-color)');
            break;
        }
    }
}

export default BaseView;

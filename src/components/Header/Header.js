import Tabbar from '../Tabbar/Tabbar.js';
import MainLabel from '../MainLabel/MainLabel.js';
import HeadersItems from '../../consts/headersItems.js';
import Routes from '../../consts/routes.js';
import { Icons } from '../../consts/icons.js';
import template from './Header.hbs';
import img from '../../../public/img/img.png';

/**
 * @class
 * Компонента Header
 */
class Header {
    /**
     * Создает экземпляр Header
     *
     * @constructor
     * @this  {Header}
     * @param {{activeIcon:HeadersItems, Tabbar: any}} context
     */
    constructor(context) {
        this.template = template;
        this.context = context || { activeIcon: '' };
        if (!this.context.activeIcon) {
            this.context.activeIcon = '';
        }
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        const activeIcon = this.context.activeIcon;
        this.context.Tabbar =
            this.context.Tabbar ||
            new Tabbar({
                icons: [
                    {
                        href: Routes.homeRoute,
                        size: 28,
                        src:
                            activeIcon === HeadersItems.home
                                ? Icons.home_fill
                                : Icons.home_stroke
                    },
                    {
                        href: Routes.messageRoute,
                        size: 28,
                        src:
                            activeIcon === HeadersItems.send_message
                                ? Icons.send_message_fill
                                : Icons.send_message_stroke
                    },
                    {
                        size: 28,
                        src:
                            activeIcon === HeadersItems.like
                                ? Icons.like_fill
                                : Icons.like_stroke
                    },
                    {
                        href: Routes.settingsRoute,
                        size: 28,
                        src: Icons.settings
                    },
                    {
                        href: Routes.homeRoute,
                        iconClasses: 'avatar u-avatar-header',
                        size: 28,
                        src: img
                    }
                ]
            }).render();

        this.context.MainLabel = new MainLabel().render();
        return this.template(this.context);
    }
}

export default Header;

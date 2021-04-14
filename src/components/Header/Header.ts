import Component from '../Component';
import Tabbar from '../Tabbar/Tabbar';
import MainLabel from '../MainLabel/MainLabel';
import HeadersItems from '../../consts/headersItems';
import Routes from '../../consts/routes';
import { Icons } from '../../consts/icons';
import template from './Header.hbs';
import './Header.scss';
import img from '@img/img.jpg';

interface IHeader {
    activeIcon: string;
    Tabbar: string;
}

/**
 * @class
 * Компонента Header
 */
class Header extends Component {
    /**
     * Создает экземпляр Header
     *
     * @constructor
     * @this  {Header}
     * @param {IHeader} context
     */
    constructor(context?: IHeader) {
        super(context, template);
        this.context = context || { activeIcon: '' };
        if (!this.context.activeIcon) {
            this.context.activeIcon = '';
        }
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render(): string {
        const activeIcon = this.context.activeIcon;
        this.context.Tabbar =
            this.context.Tabbar ||
            new Tabbar({
                icons: [
                    {
                        icon: {
                            href: Routes.homeRoute,
                            size: 28,
                            src:
                                activeIcon === HeadersItems.home
                                    ? Icons.home_fill
                                    : Icons.home_stroke
                        }
                    },
                    {
                        icon: {
                            href: Routes.messageRoute,
                            size: 28,
                            src:
                                activeIcon === HeadersItems.send_message
                                    ? Icons.send_message_fill
                                    : Icons.send_message_stroke
                        }
                    },
                    {
                        icon: {
                            size: 28,
                            src:
                                activeIcon === HeadersItems.like
                                    ? Icons.like_fill
                                    : Icons.like_stroke
                        }
                    },
                    {
                        icon: {
                            href: Routes.settingsRoute,
                            size: 28,
                            src: Icons.settings
                        }
                    },
                    {
                        icon: {
                            iconClasses: 'avatar u-avatar-header',
                            size: 28,
                            src: img
                        }
                    }
                ]
            }).render();

        this.context.MainLabel = new MainLabel().render();
        return this.template(this.context);
    }
}

export default Header;

import Tabbar from '../Tabbar/Tabbar.js';
import MainLabel from '../MainLabel/MainLabel.js';
import headerIcons from '../../consts/headerIcons.js';
import Routes from '../../consts/routes.js';
import Icons from '../../consts/icons.js';

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
     * @param {{activeIcon:headerIcons}} context
     */
    constructor(context) {
        this.template = Handlebars.templates['Header.hbs'];
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
        this.context.Tabbar = new Tabbar({
            icons: [
                {
                    href: Routes.homeRoute,
                    size: 28,
                    src:
                        activeIcon === headerIcons.home
                            ? Icons.home_fill
                            : Icons.home_stroke
                },
                {
                    href: Routes.messageRoute,
                    size: 28,
                    src:
                        activeIcon === headerIcons.send_message
                            ? Icons.send_message_fill
                            : Icons.send_message_stroke
                },
                {
                    size: 28,
                    src:
                        activeIcon === headerIcons.like
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
                    src: window.localStorage.getItem('u-avatar')
                }
            ]
        }).render();

        this.context.MainLabel = new MainLabel().render();
        return this.template(this.context);
    }
}

export default Header;

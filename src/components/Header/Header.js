import Tabbar from '../Tabbar/Tabbar.js';
import MainLabel from '../MainLabel/MainLabel.js';
import headerIcons from '../../consts/headerIcons.js';

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
                    href: '/',
                    size: 28,
                    src: `icon/home_${
                        activeIcon === headerIcons.home ? 'fill' : 'stroke'
                    }.svg`
                },
                {
                    href: '/message',
                    size: 28,
                    src: `icon/send_message_${
                        activeIcon === headerIcons.send_message
                            ? 'fill'
                            : 'stroke'
                    }.svg`
                },
                {
                    href: '/search',
                    size: 28,
                    src: `icon/location_${
                        activeIcon === headerIcons.search ? 'fill' : 'stroke'
                    }.svg`
                },
                {
                    size: 28,
                    src: `icon/like_${
                        activeIcon === headerIcons.like ? 'fill' : 'stroke'
                    }.svg`
                },
                {
                    href: '/settings',
                    size: 28,
                    src: 'icon/settings.svg'
                },
                {
                    href: '',
                    iconClasses: 'avatar',
                    size: 28,
                    src: 'img/logo.png'
                }
            ]
        }).render();

        this.context.MainLabel = new MainLabel().render();
        return this.template(this.context);
    }
}

export default Header;

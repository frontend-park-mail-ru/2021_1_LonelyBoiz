import Component from '../Component';
import IconClass, { IIconClass } from '../Icon/Icon';
import template from './Tabbar.hbs';
import './Tabbar.scss';

export interface ITabbar {
    icons: {
        icon?: IIconClass;
        idHref?: string;
    }[];
}

/**
 * @class
 * Компонента Tabbar
 */
class Tabbar extends Component {
    /**
     * Создает экземпляр Tabbar
     *
     * @constructor
     * @this  {Tabbar}
     * @param {ITabbar} context
     */
    constructor(context: ITabbar) {
        super(context, template);
        this.context = context || {};
        this.context.icons = context.icons.map((item) => {
            return { ...item, ...item.icon, icon: new IconClass(item.icon).render() };
        });
    }
}

export default Tabbar;

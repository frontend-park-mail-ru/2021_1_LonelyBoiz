import IconClass from '../Icon/Icon.js';
import template from './Tabbar.hbs';

/**
 * @class
 * Компонента Tabbar
 */
class Tabbar {
    /**
     * Создает экземпляр Tabbar
     *
     * @constructor
     * @this  {Tabbar}
     * @param {{ icons: {iconClasses:"", size:28, src:"logo.png", href, iconCode, idDiv, idHref}[]}} context
     */
    constructor(context) {
        this.template = template;
        this.context = context || {};
        this.context.icons = context.icons.map((item) => {
            return { ...item, icon: new IconClass(item).render() };
        });
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default Tabbar;

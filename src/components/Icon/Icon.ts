import Component from '../Component';
import template from './Icon.hbs';

export interface IIconClass {
    iconClasses?: string;
    size?: number;
    src?: string;
    href?: string;
    iconCode?: string;
    idDiv?: string;
}

/**
 * @class
 * Компонента IconClass
 */
class IconClass extends Component {
    /**
     * Создает экземпляр IconClass
     *
     * @constructor
     * @this  {IconClass}
     * @param {IIconClass} context
     */
    constructor(context?: IIconClass) {
        super(context, template);
        if (!this.context.size) {
            this.context.size = 28;
        }

        if (this.context.iconCode && this.context.size) {
            this.context.iconCode = this.context.iconCode.replaceAll(
                /width="\d+"/g,
                `width="${this.context.size}"`
            );
            this.context.iconCode = this.context.iconCode.replaceAll(
                /height="\d+"/g,
                `height="${this.context.size}"`
            );
        }
    }
}

export default IconClass;

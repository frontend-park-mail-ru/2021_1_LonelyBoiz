import Component from '../Component';
import Tooltip, { direction } from '../Tooltip/Tooltip';
import template from './Icon.hbs';

export interface IIconClass {
    iconClasses?: string;
    size?: number;
    src?: string;
    href?: string;
    iconCode?: string;
    idDiv?: string;
    text?: string;
    useTooltip?: boolean;
    arrow?: boolean;
    direction?: direction;
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

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render(): string {
        if (this.context.useTooltip) {
            return new Tooltip({
                children: this.template(this.context),
                text: this.context.text ?? '',
                classes: this.context.iconClasses + 'icon svg-icon',
                direction: this.context.direction ?? 'bottom'
            }).render();
        } else {
            return this.template(this.context);
        }
    }
}

export default IconClass;

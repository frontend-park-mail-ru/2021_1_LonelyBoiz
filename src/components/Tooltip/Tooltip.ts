import Context from '../../utils/Context';
import Component from '../Component';
import template from './Tooltip.hbs';
import './Tooltip.scss';

export type direction = 'top' | 'right' | 'left' | 'bottom';

export interface ITooltip {
    text: string;
    children: Context;
    direction?: direction;
    arrow?: boolean;
    classes?: string;
}

/**
 * @class
 * Компонента Tooltip
 */
class Tooltip extends Component {
    /**
     * Создает экземпляр Tooltip
     *
     * @constructor
     * @this  {Tooltip}
     * @param {ITooltip} context
     */
    constructor(context?: ITooltip) {
        context.direction = context.direction ?? 'bottom';
        context.arrow = context.arrow ?? true;

        super(context, template);
    }
}

export default Tooltip;

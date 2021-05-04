import Component from '../Component';
import template from './Cell.hbs';
import './Cell.scss';

interface ICell {
    avatar?: string;
    iconBefore?: string;
    children?: string;
    text?: string;
    caption?: string;
    after?: string;
    hover?: boolean;
    pointer?: boolean;
    id?: string;
}

/**
 * @class
 * Компонента Cell
 */
class Cell extends Component {
    /**
     * Создает экземпляр Cell
     *
     * @constructor
     * @this  {Cell}
     * @param {ICell} context
     */
    constructor(context: ICell) {
        context.hover = context.hover ?? true;
        context.pointer = context.pointer ?? true;
        super(context, template);
    }
}

export default Cell;

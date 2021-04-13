import Component from '../Component';
import template from './Cell.hbs';
import './Cell.css';

interface ICell {
    avatar?: string;
    children?: string;
    text?: string;
    caption?: string;
    after?: string;
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
        super(context, template);
    }
}

export default Cell;

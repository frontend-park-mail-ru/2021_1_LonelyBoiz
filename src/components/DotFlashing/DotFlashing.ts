import Component from '../Component';
import template from './DotFlashing.hbs';
import './DotFlashing.css';

interface IDotFlashing {
    avatar?: string;
    children?: string;
    text?: string;
    caption?: string;
    after?: string;
}

// https://codepen.io/nzbin/pen/GGrXbp
/**
 * @class
 * Компонента DotFlashing
 */
class DotFlashing extends Component {
    /**
     * Создает экземпляр DotFlashing
     *
     * @constructor
     * @this  {DotFlashing}
     * @param {IDotFlashing} context
     */
    constructor(context?: IDotFlashing) {
        super(context, template);
    }
}

export default DotFlashing;

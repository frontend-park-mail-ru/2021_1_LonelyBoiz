import Component from '../Component';
import template from './Counter.hbs';
import './Counter.scss';

interface ICounter {
    text?: string;
}

/**
 * @class
 * Компонента Counter
 */
class Counter extends Component {
    /**
     * Создает экземпляр Counter
     *
     * @constructor
     * @this  {Counter}
     * @param {ICounter} context
     */
    constructor(context?: ICounter) {
        super(context, template);
    }
}

export default Counter;

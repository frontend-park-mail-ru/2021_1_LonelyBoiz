import Component from '../Component';
import template from './Burger.hbs';
import './Burger.scss';

interface IBurger {
    id?: string;
}

/**
 * @class
 * Компонента кнопки
 */
class Burger extends Component {
    /**
     * Создает экземпляр кнопки
     *
     * @constructor
     * @this  {Burger}
     * @param {IBurger} context
     */
    constructor(context?: IBurger) {
        super(context, template);
    }
}

export default Burger;

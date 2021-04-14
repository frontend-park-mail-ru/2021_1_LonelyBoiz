import Component from '../Component';
import template from './Switch.hbs';
import './Switch.scss';

/**
 * @class
 * Компонента кнопки
 */
class Switch extends Component {
    /**
     * Создает экземпляр кнопки
     *
     * @constructor
     * @this  {Switch}
     */
    constructor() {
        super(null, template);
    }
}

export default Switch;

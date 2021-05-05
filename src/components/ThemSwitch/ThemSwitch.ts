import Component from '../Component';
import template from './ThemSwitch.hbs';
import './ThemSwitch.scss';

/**
 * @class
 * Компонента кнопки
 */
class ThemSwitch extends Component {
    /**
     * Создает экземпляр кнопки
     *
     * @constructor
     * @this  {ThemSwitch}
     */
    constructor() {
        super(null, template);
    }
}

export default ThemSwitch;

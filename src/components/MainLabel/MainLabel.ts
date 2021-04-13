import Component from '../Component';
import template from './MainLabel.hbs';
import './MainLabel.css';

/**
 * @class
 * Компонента логотипа
 */
class MainLabel extends Component {
    /**
     * Создает экземпляр MainLabel
     *
     * @constructor
     * @this  {MainLabel}
     */
    constructor() {
        super({}, template);
    }
}

export default MainLabel;

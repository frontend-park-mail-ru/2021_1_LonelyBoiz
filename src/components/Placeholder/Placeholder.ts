import Component from '../Component';
import template from './Placeholder.hbs';
import './Placeholder.scss';

interface IPlaceholder {
    iconCode?: string;
    id?: string;
    classes?: string;
    title?: string;
    subtitle?: string;
}

/**
 * @class
 * Компонента кнопки
 */
class Placeholder extends Component {
    /**
     * Создает экземпляр кнопки
     *
     * @constructor
     * @this  {Placeholder}
     * @param {IPlaceholder} context
     */
    constructor(context?: IPlaceholder) {
        super(context, template);
    }
}

export default Placeholder;

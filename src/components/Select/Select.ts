import Component from '../Component';
import template from './Select.hbs';
import './Select.scss';

interface ISelect {
    title?: string;
    options: string[];
    disabled?: boolean;
    required?: boolean;
    id?: string;
    class?: string;
}

/**
 * @class
 * Компонента выбора опций
 */
class Select extends Component {
    /**
     * Создает экземпляр Select
     *
     * @constructor
     * @this  {Select}
     * @param {ISelect} context контекст для выбора опций
     */
    constructor(context?: ISelect) {
        super(context, template);
    }
}

export default Select;

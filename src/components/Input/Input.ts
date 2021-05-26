import Component from '../Component';
import template from './Input.hbs';
import './Input.scss';

interface IInput {
    id?: string;
    bgGray?: boolean;
    required?: boolean;
    disabled?: boolean;
    accept?: string;
    type?: string;
    placeholder?: string;
    defaultValue?: string;
    minValue?: string;
    maxValue?: string;
}

/**
 * @class
 * Компонента ввода
 */
class Input extends Component {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {IInput}
     * @param {Object} context контекст для ввода
     */
    constructor(context?: IInput) {
        super(context, template);
        this.context = context || { type: 'text' };

        if (this.context.type && this.context.type === 'file') {
            this.context.isFile = true;
        }
    }
}

export default Input;

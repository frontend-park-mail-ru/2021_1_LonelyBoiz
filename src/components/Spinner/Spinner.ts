import Component from '../Component';
import { IconsSrc } from '../../consts/icons';
import SpinnerSize from '../../consts/spinnerSize';
import template from './Spinner.hbs';
import './Spinner.css';

interface ISpinner {
    size?: 'small' | 'regular' | 'large' | 'medium';
    classes?: string;
}

/**
 * @class
 * Компонента Spinner
 */
class Spinner extends Component {
    /**
     * Создает экземпляр Spinner
     *
     * @constructor
     * @this  {Spinner}
     * @param {ISpinner} context
     */
    constructor(context?: ISpinner) {
        super(context, template);

        this.context = context || { size: 'regular' };
        if (!this.context.size) {
            this.context.size = 'regular';
        }

        switch (this.context.size) {
        case 'large':
            this.context.height = SpinnerSize.large;
            this.context.width = SpinnerSize.large;
            this.context.src = IconsSrc.spinner_44;
            break;
        case 'medium':
            this.context.height = SpinnerSize.medium;
            this.context.width = SpinnerSize.medium;
            this.context.src = IconsSrc.spinner_32;
            break;
        case 'small':
            this.context.height = SpinnerSize.small;
            this.context.width = SpinnerSize.small;
            this.context.src = IconsSrc.spinner_16;
            break;
        default:
            this.context.height = SpinnerSize.regular;
            this.context.width = SpinnerSize.regular;
            this.context.src = IconsSrc.spinner_24;
            break;
        }
    }
}

export default Spinner;

import Icons from '../../consts/icons.js';
import SpinnerSize from '../../consts/spinnerSize.js';

/**
 * @class
 * Компонента Spinner
 */
class Spinner {
    /**
     * Создает экземпляр Spinner
     *
     * @constructor
     * @this  {Spinner}
     * @param {{ size: 'small' | 'regular' | 'large' | 'medium' }} context
     */
    constructor(context) {
        this.template = Handlebars.templates['Spinner.hbs'];
        this.context = context || { size: 'regular' };
        if (!this.context.size) {
            this.context.size = 'regular';
        }

        switch (this.context.size) {
        case 'large':
            this.context.height = SpinnerSize.large;
            this.context.width = SpinnerSize.large;
            this.context.src = Icons.spinner_44;
            break;
        case 'medium':
            this.context.height = SpinnerSize.medium;
            this.context.width = SpinnerSize.medium;
            this.context.src = Icons.spinner_32;
            break;
        case 'small':
            this.context.height = SpinnerSize.small;
            this.context.width = SpinnerSize.small;
            this.context.src = Icons.spinner_16;
            break;
        default:
            this.context.height = SpinnerSize.regular;
            this.context.width = SpinnerSize.regular;
            this.context.src = Icons.spinner_24;
            break;
        }
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default Spinner;

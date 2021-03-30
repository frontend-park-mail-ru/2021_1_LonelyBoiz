import Icons from '../../consts/icons.js';

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
            this.context.height = 44;
            this.context.width = 44;
            this.context.src = Icons.spinner_44;
            break;
        case 'medium':
            this.context.height = 32;
            this.context.width = 32;
            this.context.src = Icons.spinner_32;
            break;
        case 'small':
            this.context.height = 16;
            this.context.width = 16;
            this.context.src = Icons.spinner_16;
            break;
        default:
            this.context.height = 24;
            this.context.width = 24;
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

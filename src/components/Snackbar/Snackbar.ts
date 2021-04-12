import Component from '../Component';
import template from './Snackbar.hbs';
import './Button.css';

interface ISnackbar {
    desktop?: boolean;
    closing?: boolean;
    before?: string;
    children?: string;
    after?: string;
}

/**
 * @class
 * Компонента Snackbar
 */
class Snackbar extends Component {
    /**
     * Создает экземпляр Snackbar
     *
     * @constructor
     * @this  {Snackbar}
     * @param {ISnackbar} context
     */
    constructor(context?: ISnackbar) {
        super(context, template);

        if (!this.context.desktop) {
            this.context.desktop = true;
        }
    }
}

export default Snackbar;

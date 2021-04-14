import Component from '../Component';
import Spinner from '../Spinner/Spinner';
import template from './ScreenSpinner.hbs';
import './ScreenSpinner.scss';

/**
 * @class
 * Компонента ScreenSpinner
 */
class ScreenSpinner extends Component {
    /**
     * Создает экземпляр ScreenSpinner
     *
     * @constructor
     * @this  {ScreenSpinner}
     * @param {IScreenSpinner} context
     */
    constructor() {
        super(null, template);
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render(): string {
        this.context.Spinner = new Spinner({ size: 'large' }).render();
        return this.template(this.context);
    }
}

export default ScreenSpinner;

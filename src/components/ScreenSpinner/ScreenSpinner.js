import Spinner from '../Spinner/Spinner.js';

/**
 * @class
 * Компонента ScreenSpinner
 */
class ScreenSpinner {
    /**
     * Создает экземпляр ScreenSpinner
     *
     * @constructor
     * @this  {ScreenSpinner}
     * @param {} context
     */
    constructor(context) {
        this.template = Handlebars.templates['ScreenSpinner.hbs'];
        this.context = context || {};
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        this.context.Spinner = new Spinner({ size: 'large' }).render();
        return this.template(this.context);
    }
}

export default ScreenSpinner;

import template from './Snackbar.hbs';

/**
 * @class
 * Компонента Snackbar
 */
class Snackbar {
    /**
     * Создает экземпляр Snackbar
     *
     * @constructor
     * @this  {Snackbar}
     * @param {{ desktop: Boolean, closing: Boolean, before: Any, children: Any, after: Any }} context
     */
    constructor(context) {
        this.template = template;
        this.context = context || {};
        if (!this.context.desktop) {
            this.context.desktop = true;
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

export default Snackbar;

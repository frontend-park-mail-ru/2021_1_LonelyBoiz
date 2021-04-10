import template from './MainLabel.hbs';

/**
 * @class
 * Компонента логотипа
 */
class MainLabel {
    /**
     * Создает экземпляр MainLabel
     *
     * @constructor
     * @this  {MainLabel}
     * @param {Object} context
     */
    constructor(context) {
        this.template = template;
        this.context = context || {};
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default MainLabel;

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
    constructor (context) {
        this.template = Handlebars.templates['MainLabel.hbs'];
        this.context = context || {};
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render () {
        return this.template(this.context);
    }
}

export default MainLabel;

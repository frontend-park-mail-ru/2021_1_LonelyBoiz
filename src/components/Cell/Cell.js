/**
 * @class
 * Компонента Cell
 */
class Cell {
    /**
     * Создает экземпляр Cell
     *
     * @constructor
     * @this  {Cell}
     * @param {Object} context {avatar, children, text, caption, after}
     */
    constructor(context) {
        this.template = Handlebars.templates['Cell.hbs'];
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

export default Cell;

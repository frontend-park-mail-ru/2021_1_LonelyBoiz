// https://codepen.io/nzbin/pen/GGrXbp
/**
 * @class
 * Компонента DotFlashing
 */
class DotFlashing {
    /**
     * Создает экземпляр DotFlashing
     *
     * @constructor
     * @this  {DotFlashing}
     * @param {Object} context {avatar, children, text, caption, after}
     */
    constructor(context) {
        this.template = Handlebars.templates['DotFlashing.hbs'];
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

export default DotFlashing;

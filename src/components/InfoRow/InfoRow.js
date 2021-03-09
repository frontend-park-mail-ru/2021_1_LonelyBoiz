/**
 * @class
 * Компонента InfoRow
 */
class InfoRow {
    /**
     * Создает экземпляр InfoRow
     *
     * @constructor
     * @this  {InfoRow}
     * @param {Object} context {iconSrc, text}
     */
    constructor (context) {
        this.template = Handlebars.templates['InfoRow.hbs'];
        this.context = context;
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render () {
        return this.template(this.context);
    }
}

export default InfoRow;

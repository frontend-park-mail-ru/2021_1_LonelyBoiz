/**
 * @class
 * Компонента PopoutWrapper
 */
class PopoutWrapper {
    /**
     * Создает экземпляр PopoutWrapper
     *
     * @constructor
     * @this  {PopoutWrapper}
     */
    constructor(context) {
        this.template = Handlebars.templates['PopoutWrapper.hbs'];
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

export default PopoutWrapper;

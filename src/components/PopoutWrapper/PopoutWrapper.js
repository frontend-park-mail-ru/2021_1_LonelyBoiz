import template from './PopoutWrapper.hbs';

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

export default PopoutWrapper;

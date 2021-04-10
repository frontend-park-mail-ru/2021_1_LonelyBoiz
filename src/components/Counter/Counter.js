import template from './Counter.hbs';

/**
 * @class
 * Компонента Counter
 */
class Counter {
    /**
     * Создает экземпляр Counter
     *
     * @constructor
     * @this  {Counter}
     * @param {Object} context {text}
     */
    constructor(context) {
        this.template = template;
        this.context = context;
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default Counter;

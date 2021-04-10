import template from './Form.hbs';

/**
 * @class
 * Компонента формы
 */
class Form {
    /**
     * Создает экземпляр формы
     *
     * @constructor
     * @this  {Form}
     * @param {Object} context контекст для формы
     */
    constructor(context) {
        this.template = template;
        this.context = context;
    }

    /**
     * Отображает компонент ввода
     * @returns {String} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default Form;

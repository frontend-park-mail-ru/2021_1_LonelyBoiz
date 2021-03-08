const select = 'Select.hbs';

/**
 * @class
 * Компонента выбора опций
 */
class Select {
    /**
     * Создает экземпляр Select
     *
     * @constructor
     * @this  {Select}
     */
    constructor () {
        this.template = Handlebars.templates[select];
    }

    /**
     * Отображает компонент выбора опций
     */
    render (context) {
        return this.template(context);
    }
}

export default Select;

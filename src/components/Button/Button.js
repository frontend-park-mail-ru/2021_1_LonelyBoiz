const buttonTemplate = 'Button.hbs';

/**
 * @class
 * Компонента кнопки
 */
class Button {
    /**
     * Создает экземпляр кнопки
     *
     * @constructor
     * @this  {Button}
     * @param {Object} context {text, mode:"primary"|"secondary"}
     */
    constructor (context) {
        this.template = Handlebars.templates[buttonTemplate];
        this.context = context;
    }

    /**
     * Отображает компонент кнопким
     * @returns {Object} Построенный компонент
     */
    render () {
        return this.template(this.context);
    }
}

export default Button;

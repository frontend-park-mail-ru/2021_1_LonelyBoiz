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
     */
    constructor () {
        this.template = Handlebars.templates[buttonTemplate];
    }

    /**
     * Отображает компонент кнопким
     * @param {Object} context - Контекст с тектом и типом
     */
    render (context) {
        return this.template(context);
    }
}

export default Button;

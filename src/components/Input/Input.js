const inputTemplate = 'Input.hbs'

/**
 * @class
 * Компонента ввода
 */
class Input {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {Input}
     */
    constructor () {
        this.template = Handlebars.templates[inputTemplate]
    }

    /**
     * Отображает компонент ввода
     * @param {Object} context - Контекст с тектом и типом
     */
    render (context) {
        return this.template(context)
    }
}

export default Input

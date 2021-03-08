const formTemplate = 'Form.hbs'

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
     */
    constructor () {
        this.template = Handlebars.templates[formTemplate]
    }

    /**
     * Отображает компонент ввода
     * @param {Object} context - Контекст с массивом вводов и кнопкой
     */
    render (context) {
        return this.template(context)
    }
}

export default Form

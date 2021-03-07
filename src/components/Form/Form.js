import Input from '../Input/Input.js'
import Button from '../Button/Button.js'

const formTemplate = 'LoginForm.hbs'

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
    constructor() {
        this.template = Handlebars.templates[formTemplate];
    }

    render(context) {
        this.context = {
            inputs: [
                new Input().render(context.inputs[0]),
                new Input().render(context.inputs[1]),
            ],
            button: new Button().render(context.button)
        }

        return this.template(this.context)
    }
}

export default Form

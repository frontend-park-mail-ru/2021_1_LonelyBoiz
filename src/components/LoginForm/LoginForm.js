import Input from '../Input/Input.js'
import Button from '../Button/Button.js'

const loginFormTemplate = 'LoginForm.hbs'

class LoginForm {
    constructor() {
        this.template = Handlebars.templates[loginFormTemplate];
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

export default LoginForm

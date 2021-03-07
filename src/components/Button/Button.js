const buttonTemplate = 'Button.hbs'

class Button {
    constructor() {
        this.template = Handlebars.templates[buttonTemplate];
        this.context = {'text': 'button test'}
    }

    setContext(context) {
        this.context = context
    }

    render() {
        return this.template(this.context)
    }
}

export default Button
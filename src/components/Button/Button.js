const buttonTemplate = 'Button.hbs'

class Button {
    constructor() {
        this.template = Handlebars.templates[buttonTemplate];
    }

    render(context) {
        return this.template(context)
    }
}

export default Button
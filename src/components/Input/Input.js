const inputTemplate = 'Input.hbs'

class Input {
    constructor() {
        this.template = Handlebars.templates[inputTemplate];
    }

    render(context) {
        return this.template(context)
    }
}

export default Input

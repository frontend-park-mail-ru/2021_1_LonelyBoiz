/**
 * @class
 * Компонента Message
 */
class Message {
    /**
     * Создает экземпляр Message
     *
     * @constructor
     * @this  {Message}
     * @param {Object} context {text, usersMessage}
     */
    constructor(context) {
        this.template = Handlebars.templates['Message.hbs'];
        this.context = context;
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default Message;

import template from './Button.hbs';

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
     * @param {Object} context {type:"button"|"submit", id, text, mode:"primary"|"secondary"|"destructive"}
     */
    constructor(context) {
        this.template = template;
        this.context = context || {
            mode: 'primary',
            type: 'submit'
        };
        if (!this.context.type) {
            this.context.type = 'submit';
        }
        if (this.context.mode && this.context.mode === 'secondary') {
            this.context.secondary = true;
        }
        if (this.context.mode && this.context.mode === 'primary') {
            this.context.primary = true;
        }
        if (this.context.mode && this.context.mode === 'destructive') {
            this.context.destructive = true;
        }
    }

    /**
     * Отображает компонент кнопким
     * @returns {String} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default Button;

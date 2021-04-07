/**
 * @class
 * Компонента IconClass
 */
class IconClass {
    /**
     * Создает экземпляр IconClass
     *
     * @constructor
     * @this  {IconClass}
     * @param {{ iconClasses:"", size:28, src:"logo.png", href, iconCode, idDiv}} context
     */
    constructor(context) {
        this.template = Handlebars.templates['Icon.hbs'];
        this.context = context || {};

        if (!context.size) {
            this.context.size = 28;
        }

        if (this.context.iconCode && this.context.size) {
            this.context.iconCode = this.context.iconCode.replaceAll(/width="\d+"/g, `width="${this.context.size}"`);
            this.context.iconCode = this.context.iconCode.replaceAll(/height="\d+"/g, `height="${this.context.size}"`);
        }
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default IconClass;

/**
 * @class
 * Компонента Tabbar
 */
class Tabbar {
    /**
     * Создает экземпляр Tabbar
     *
     * @constructor
     * @this  {Tabbar}
     * @param {{ icons: {iconClasses:"", size:28, src:"logo.png", href, iconCode, idDiv, idHref}[]}} context
     */
    constructor(context) {
        this.template = Handlebars.templates['Tabbar.hbs'];
        this.context = context;
        context.icons.forEach((item) => {
            if (item.iconCode && item.size) {
                item.iconCode = item.iconCode.replaceAll(/width="\d+"/g, `width="${item.size}"`);
                item.iconCode = item.iconCode.replaceAll(/height="\d+"/g, `height="${item.size}"`);
            }
        });
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default Tabbar;

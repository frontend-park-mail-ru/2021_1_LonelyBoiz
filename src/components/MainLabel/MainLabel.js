const mainLabelTemplate = 'MainLabel.hbs';

/**
 * @class
 * Компонента логотипа
 */
class MainLabel {
    /**
     * Создает экземпляр MainLabel
     *
     * @constructor
     * @this  {MainLabel}
     */
    constructor () {
        this.template = Handlebars.templates[mainLabelTemplate];
    }

    /**
     * Отображает компонент логотипа
     */
    render () {
        return this.template({});
    }
}

export default MainLabel;

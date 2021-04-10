import template from './Emojies.hbs';

/**
 * @class
 * Компонента Emojies
 */
class Emojies {
    /**
     * Создает экземпляр Emojies
     *
     * @constructor
     * @this  {Emojies}
     * @param {{ emojies: [][] }} context
     */
    constructor(context) {
        this.template = template;
        this.context = context || {};
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default Emojies;

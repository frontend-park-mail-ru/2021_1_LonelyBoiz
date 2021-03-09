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
	 * @param {Object[]} context {icons:[{iconClasses="", size=28, src="logo.png", href}]}
	 */
	constructor(context) {
		this.template = Handlebars.templates['Tabbar.hbs'];
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

export default Tabbar;

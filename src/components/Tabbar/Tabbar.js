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
	 */
	constructor() {
		this.template = Handlebars.templates['Tabbar.hbs'];
	}

	/**
	 * @render
	 * @this  {Tabbar}
	 * @param {Object[]} context {icons:[{iconClasses="", size=28, src="logo.png", href}]}
	 */
	render(context) {
		return this.template(context);
	}
}

export default Tabbar;

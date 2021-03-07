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
		this.context = {
			icons: [
				{
					iconClasses: '',
					size: 28,
					src: 'logo.png',
				},
			],
		};
	}

	/**
	 * @render
	 * @this  {Tabbar}
	 * @param {Object[]} context {icons:[{iconClasses='', size=28, src='logo.png', href}]}
	 */
	render(context) {
		this.context = context;
		return this.template(this.context);
	}
}

export default Tabbar;

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
	 * @param {Object[]} context {icons:[{iconClasses='', size=28, src='logo.png', href}]}
	 * @param parent
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

	setContext(context) {
		this.context = context;
	}

	render() {
		return this.template(this.context);
	}
}

export default Tabbar;

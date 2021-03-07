/**
 * @class
 * Компонента MainSlogan
 */
class MainSlogan {
	/**
	 * Создает экземпляр MainSlogan
	 *
	 * @constructor
	 * @this  {MainSlogan}
	 * @param context
	 * @param parent
	 */
	constructor() {
		this.template = Handlebars.templates['MainSlogan.hbs'];
		this.context = {
			text: '',
		};
	}

	setContext(context) {
		this.context = context;
	}

	render() {
		return this.template(this.context);
	}
}

export default MainSlogan;

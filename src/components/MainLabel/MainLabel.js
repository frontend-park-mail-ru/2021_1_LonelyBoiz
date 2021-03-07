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
	constructor() {
		this.template = Handlebars.templates['MainLabel.hbs'];
		this.context = {
			text: '',
		};
	}

	/**
	 * @render
	 * @this  {MainLabel}
	 * @param {Object} context {}
	 */
	render(context) {
		this.context = context;
		return this.template(this.context);
	}
}

export default MainLabel;

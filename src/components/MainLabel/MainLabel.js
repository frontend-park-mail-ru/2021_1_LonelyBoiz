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
	}

	/**
	 * @render
	 * @this  {MainLabel}
	 */
	render() {
		return this.template();
	}
}

export default MainLabel;

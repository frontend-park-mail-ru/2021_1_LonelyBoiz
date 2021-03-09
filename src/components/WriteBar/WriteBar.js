import Input from '../Input/Input.js';
/**
 * @class
 * Компонента WriteBar
 */
class WriteBar {
	/**
	 * Создает экземпляр WriteBar
	 *
	 * @constructor
	 * @this  {WriteBar}
	 */
	constructor(context) {
		this.template = Handlebars.templates['WriteBar.hbs'];
		this.context = context;
	}

	/**
	 * Отображает компонент
	 * @returns {string} Построенный компонент
	 */
	render() {
		this.context.Input = new Input({
			placeholder: 'Сообщение',
			bg_gray: true,
		}).render();
		return this.template(this.context);
	}
}

export default WriteBar;

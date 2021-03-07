import Input from "../Input/Input.js"
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
	constructor() {
		this.template = Handlebars.templates['WriteBar.hbs'];
	}

	/**
	 * @render
	 * @this  {WriteBar}
	 */
	render(context) {
        const input = new Input();
		context.Input = input.render({placeholder:"Сообщение", bg_gray:true})
		return this.template(context);
	}
}

export default WriteBar;

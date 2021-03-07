import Tabbar from '../Tabbar/Tabbar.js';
import MainLabel from '../MainLabel/MainLabel.js';
/**
 * @class
 * Компонента Header
 */
class Header {
	/**
	 * Создает экземпляр Header
	 *
	 * @constructor
	 * @this  {Header}
	 */
	constructor() {
		this.template = Handlebars.templates['Header.hbs'];
	}
	
	/**
	 * @render
	 * @this  {Header}
	 */
	render() {
		let context = {};
		const tabbar = new Tabbar();
		context.Tabbar = tabbar.render({
			icons: [
				{ iconClasses: '', size: 28, src: 'icon/home_fill.svg' },
				{
					iconClasses: '',
					size: 28,
					src: 'icon/send_message_stroke.svg',
				},
				{ iconClasses: '', size: 28, src: 'icon/search_stroke.svg' },
				{ iconClasses: '', size: 28, src: 'icon/like_stroke.svg' },
				{ iconClasses: 'avatar', size: 28, src: 'img/logo.png' },
			],
		});

		const mainLabel = new MainLabel();
		context.MainLabel = mainLabel.render();
		return this.template(context);
	}
}

export default Header;

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
		this.context = {};
	}
	
	/**
	 * @render
	 * @this  {Header}
	 * @param {Object} context {}
	 */
	render(context) {
		this.context = context;
		const tabbar = new Tabbar();
		this.context.tabbar = tabbar.render({
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
		this.context.MainLabel = mainLabel.render();
		return this.template(this.context);
	}
}

export default Header;

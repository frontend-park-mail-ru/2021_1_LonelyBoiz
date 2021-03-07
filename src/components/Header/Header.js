import Tabbar from '../Tabbar/Tabbar.js';
import MainSlogan from '../MainSlogan/MainSlogan.js';
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
	 * @param context
	 * @param parent
	 */
	constructor() {
		this.template = Handlebars.templates['Header.hbs'];
		this.context = {};
	}

	setContext(context) {
		this.context = context;
	}

	render() {
		const tabbar = new Tabbar();
		tabbar.setContext({
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
		this.context.tabbar = tabbar.render();

		const mainSlogan = new MainSlogan();
		this.context.mainSlogan = mainSlogan.render();
		return this.template(this.context);
	}
}

export default Header;

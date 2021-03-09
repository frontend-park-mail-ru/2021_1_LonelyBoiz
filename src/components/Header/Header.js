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
	 * @param {Object} context
	 */
	constructor(context) {
		this.template = Handlebars.templates['Header.hbs'];
		this.context = context || {};
	}
	
	/**
	 * Отображает компонент
	 * @returns {string} Построенный компонент
	 */
	render() {
		this.context.Tabbar = new Tabbar({
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
		}).render();

		this.context.MainLabel = new MainLabel().render();
		return this.template(this.context);
	}
}

export default Header;

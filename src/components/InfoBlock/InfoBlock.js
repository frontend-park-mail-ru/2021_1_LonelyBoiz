import InfoRow from '../InfoRow/InfoRow.js';
import Tabbar from '../Tabbar/Tabbar.js';

/**
 * @class
 * Компонента InfoBlock
 */
class InfoBlock {
	/**
	 * Создает экземпляр InfoBlock
	 *
	 * @constructor
	 * @this  {InfoBlock}
	 * @param {Object} context {avatar, title, messageIconInTitle, info:{city, geo, instagram}, description, button["like", "return", "message", "cancel"]], borderRadiusBottom|borderRadiusRight}
	 */
	constructor(context) {
		this.template = Handlebars.templates['InfoBlock.hbs'];
		this.context = context;
	}

	/**
	 * Отображает компонент
	 * @returns {string} Построенный компонент
	 */
	render() {
		let infoRowsType = {
			city: { iconSrc: 'icon/home_stroke.svg', text: 'Живет в:' },
			geo: { iconSrc: 'icon/geo_stroke.svg', text: '' },
			instagram: { iconSrc: 'icon/instagram_stroke.svg', text: '@' },
		};

		const tabbarIcons = {
			like: 'icon/like_stroke.svg',
			return: 'icon/arrow_return_left.svg',
			message: 'icon/message_stroke.svg',
			cancel: 'icon/cancel.svg',
		};

		this.context.InfoRows = [];
		for (const [key, value] of Object.entries(this.context.info)) {
			infoRowsType[key].text += value;
			this.context.InfoRows.push(new InfoRow(infoRowsType[key]).render());
		}
		if (this.context.description) {
			this.context.Description = new InfoRow({
				text: this.context.description,
			}).render();
		}

		if (
			this.context.button &&
			(typeof this.context.button == 'object' ||
				typeof this.context.button == 'array') &&
			this.context.button.length > 0
		) {
			this.context.Tabbar = new Tabbar({
				icons: this.context.button.map((item, i) => {
					return { size: 24, src: tabbarIcons[item] };
				}),
			}).render();
		}

		this.context.Tabbar1 = new Tabbar({
			icons: [{ iconClasses: 'avatar', size: 28, src: 'img/logo.png' }],
		}).render();

		return this.template(this.context);
	}
}

export default InfoBlock;

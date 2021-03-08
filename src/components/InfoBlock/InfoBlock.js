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
	 */
	constructor() {
		this.template = Handlebars.templates['InfoBlock.hbs'];
	}

	/**
	 * @render
	 * @this  {InfoBlock}
	 * @param {Object} context {avatar, title, messageIconInTitle, info:{city, geo, instagram}, description, button["like", "return", "message", "cancel"]], borderRadiusBottom|borderRadiusRight}
	 */
	render(context) {
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

		const infoRow = new InfoRow();
		context.InfoRows = [];
		for (const [key, value] of Object.entries(context.info)) {
			infoRowsType[key].text += value;
			context.InfoRows.push(infoRow.render(infoRowsType[key]));
		}
		if (context.description) {
			context.Description = infoRow.render({ text: context.description });
		}

		const tabbar = new Tabbar();
		if (
			context.button &&
			(typeof context.button == 'object' ||
				typeof context.button == 'array') &&
			context.button.length > 0
		) {
			context.Tabbar = tabbar.render({
				icons: context.button.map((item, i) => {
					return { size: 24, src: tabbarIcons[item] };
				}),
			});
		}

		
		context.Tabbar1 = tabbar.render({
			icons: [
				{ iconClasses: 'avatar', size: 28, src: 'img/logo.png' },
			],
		});

		return this.template(context);
	}
}

export default InfoBlock;

import InfoBlock from '../InfoBlock/InfoBlock.js';
import PhotoBlock from '../PhotoBlock/PhotoBlock.js';

/**
 * @class
 * Компонента Card
 */
class Card {
	/**
	 * Создает экземпляр Card
	 *
	 * @constructor
	 * @this  {Card}
	 * @param {Object} context {user:{name, age, avatar, geo, city, instagram, description}, photos:[], vertical, horizontal}
	 */
	constructor(context) {
		this.template = Handlebars.templates['Card.hbs'];
		this.context = context;

		// {button["like", "return", "message", "cancel"]], borderRadiusBottom|borderRadiusRight}
		let infoBlockContext = {
			...this.context.user,
			info: {},
			title: this.context.user.name,
			messageIconInTitle: this.context.vertical,
			borderRadiusBottom: this.context.vertical,
			borderRadiusRight: this.context.horizontal,
			messageIconInTitle: this.context.vertical,
			button: ['like', 'return', 'message', 'cancel'],
		};

		if (this.context.user.geo) {
			infoBlockContext.info.geo = this.context.user.geo;
		}
		if (this.context.user.city) {
			infoBlockContext.info.city = this.context.user.city;
		}
		if (this.context.user.instagram) {
			infoBlockContext.info.instagram = this.context.user.instagram;
		}
		if (this.context.user.age) {
			infoBlockContext.title += `, ${this.context.user.age}`;
		}

		// {photos:[], activePhotoId, disableLeftArrow, disableRightArrow, borderRadiusTop|borderRadiusLeft}
		let photoBlockContext = {
			photos: this.context.photos,
			borderRadiusTop: this.context.vertical,
			borderRadiusLeft: this.context.horizontal,
		};
	}

	/**
	 * Отображает компонент
	 * @returns {string} Построенный компонент
	 */
	render() {
		this.context.Info = new InfoBlock(infoBlockContext).render();
		this.context.Photo = new PhotoBlock(photoBlockContext).render();
		return this.template(this.context);
	}
}

export default Card;

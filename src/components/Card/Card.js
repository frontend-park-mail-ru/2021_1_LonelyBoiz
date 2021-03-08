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
	 */
	constructor() {
		this.template = Handlebars.templates['Card.hbs'];
	}

	/**
	 * @render
	 * @this  {Card}
	 * @param {Object} context {user:{name, age, avatar, geo, city, instagram, description}, photos:[], vertical, horizontal}
	 */
	render(context) {
		const infoBlock = new InfoBlock();
		// {button["like", "return", "message", "cancel"]], borderRadiusBottom|borderRadiusRight}
		let infoBlockContext = {
			...context.user,
			info: {},
			title: context.user.name,
			messageIconInTitle: context.vertical,
			borderRadiusBottom: context.vertical,
			borderRadiusRight: context.horizontal,
			messageIconInTitle: context.vertical,
			button:["like", "return", "message", "cancel"]
		};

		if (context.user.geo) {
			infoBlockContext.info.geo = context.user.geo;
		}
		if (context.user.city) {
			infoBlockContext.info.city = context.user.city;
		}
		if (context.user.instagram) {
			infoBlockContext.info.instagram = context.user.instagram;
		}
		if (context.user.age) {
			infoBlockContext.title += `, ${context.user.age}`;
		}

		context.Info = infoBlock.render(infoBlockContext);

		const photoBlock = new PhotoBlock();
		// {photos:[], activePhotoId, disableLeftArrow, disableRightArrow, borderRadiusTop|borderRadiusLeft}
		let photoBlockContext = {
			photos: context.photos,
			borderRadiusTop: context.vertical,
			borderRadiusLeft: context.horizontal,
		};
		console.log(photoBlockContext)

		context.Photo = photoBlock.render(photoBlockContext);

		return this.template(context);
	}
}

export default Card;

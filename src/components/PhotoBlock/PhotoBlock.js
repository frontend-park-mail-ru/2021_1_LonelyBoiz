/**
 * @class
 * Компонента PhotoBlock
 */
class PhotoBlock {
	/**
	 * Создает экземпляр PhotoBlock
	 *
	 * @constructor
	 * @this  {PhotoBlock}
	 */
	constructor() {
		this.template = Handlebars.templates['PhotoBlock.hbs'];
	}

	/**
	 * @render
	 * @this  {PhotoBlock}
	 * @param {Object} context {photos:[], activePhotoId, disableLeftArrow, disableRightArrow, borderRadiusTop|borderRadiusLeft}
	 */
	render(context) {
		context.Points = new Array(context.photos.length).fill(false);

		if (context.activePhotoId) {
			context.Points[context.activePhotoId] = true;
		} else {
			context.Points[0] = true;
		}
		if (context.photos.length > 0){
			context.photo = context.photos[0]
		}

		return this.template(context);
	}
}

export default PhotoBlock;

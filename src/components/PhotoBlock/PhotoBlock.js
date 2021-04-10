import template from './PhotoBlock.hbs';

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
     * @param {{photos:[], activePhotoId, disableLeftArrow, disableRightArrow, borderRadiusTop, borderRadiusLeft, disablePoints}} context
     */
    constructor(context) {
        this.template = template;
        this.context = context;
        this.context.Points = new Array(this.context.photos.length).fill(false);

        if (this.context.activePhotoId) {
            this.context.Points[this.context.activePhotoId] = true;
        } else {
            this.context.Points[0] = true;
        }
        if (this.context.photos.length > 0) {
            this.context.photo = this.context.photos[0];
        }
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        return this.template(this.context);
    }
}

export default PhotoBlock;

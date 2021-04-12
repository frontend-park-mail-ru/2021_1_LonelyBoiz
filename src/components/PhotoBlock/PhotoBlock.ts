import Component from '../Component';
import template from './PhotoBlock.hbs';
import './PhotoBlock.css';

interface IPhotoBlock {
    photos?: string[];
    activePhotoId?: string;
    disableLeftArrow?: boolean;
    disableRightArrow?: boolean;
    borderRadiusTop?: boolean;
    borderRadiusLeft?: boolean;
    disablePoints?: boolean;
}

/**
 * @class
 * Компонента PhotoBlock
 */
class PhotoBlock extends Component {
    /**
     * Создает экземпляр PhotoBlock
     *
     * @constructor
     * @this  {PhotoBlock}
     * @param {IPhotoBlock} context
     */
    constructor(context?: IPhotoBlock) {
        super(context, template);
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
}

export default PhotoBlock;

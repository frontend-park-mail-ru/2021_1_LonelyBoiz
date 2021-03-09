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

        this.context.infoBlockContext = {
            ...this.context.user,
            info: {},
            title: this.context.user.name,
            messageIconInTitle: this.context.vertical,
            borderRadiusBottom: this.context.vertical,
            borderRadiusRight: this.context.horizontal,
            button: ['like', 'return', 'message', 'cancel']
        };

        if (this.context.user.geo) {
            this.context.infoBlockContext.info.geo = this.context.user.geo;
        }
        if (this.context.user.city) {
            this.context.infoBlockContext.info.city = this.context.user.city;
        }
        if (this.context.user.instagram) {
            this.context.infoBlockContext.info.instagram = this.context.user.instagram;
        }
        if (this.context.user.age) {
            this.context.infoBlockContext.title += `, ${this.context.user.age}`;
        }

        this.context.photoBlockContext = {
            photos: this.context.photos,
            borderRadiusTop: this.context.vertical,
            borderRadiusLeft: this.context.horizontal
        };
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        this.context.Info = new InfoBlock(this.context.infoBlockContext).render();
        this.context.Photo = new PhotoBlock(this.context.photoBlockContext).render();
        return this.template(this.context);
    }
}

export default Card;

import Component from '../Component';
import InfoBlock, { IButtons } from '../InfoBlock/InfoBlock';
import PhotoBlock from '../PhotoBlock/PhotoBlock';
import template from './Card.hbs';
import './Card.css';
import { IUserModel } from '../../models/UserModel';

export interface IUser extends IUserModel {
    buttons?: IButtons;
}

interface ICard {
    user?: IUser;
    photos?: string[];
    vertical?: string;
    horizontal?: boolean;
    disableLeftArrow?: boolean;
    disableRightArrow?: boolean;
    disablePoints?: boolean;
}

/**
 * @class
 * Компонента Card
 */
class Card extends Component {
    /**
     * Создает экземпляр Card
     *
     * @constructor
     * @this  {Card}
     * @param {ICard} context
     */
    constructor(context?: ICard) {
        super(context, template);

        this.context.infoBlockContext = {
            ...this.context.user,
            info: {},
            title: this.context.user.name,
            messageIconInTitle: this.context.vertical,
            borderRadiusBottom: this.context.vertical,
            borderRadiusRight: this.context.horizontal
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
            disablePoints: this.context.disablePoints,
            disableLeftArrow: this.context.disableLeftArrow,
            disableRightArrow: this.context.disableRightArrow,
            photos: this.context.photos,
            borderRadiusTop: this.context.vertical,
            borderRadiusLeft: this.context.horizontal
        };
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render(): string {
        this.context.Info = new InfoBlock(
            this.context.infoBlockContext
        ).render();

        this.context.Photo = new PhotoBlock(
            this.context.photoBlockContext
        ).render();

        return this.template(this.context);
    }
}

export default Card;

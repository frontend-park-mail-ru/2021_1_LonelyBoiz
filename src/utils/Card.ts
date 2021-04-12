import Card from '../components/Card/Card';
import Listener from './Listener';
import { getAverageRGB } from './img';
import { IButtons } from '../components/InfoBlock/InfoBlock';
import { IUserModel } from '../models/UserModel';

interface ICardClass {
    user?: IUserModel;
    photos?: string[];
    id?: string;
    useBlure?: true;
    buttons?: IButtons;
    placeholder?: boolean;
    funcDislike?: Function;
    funcLike?: Function;
    funcReturn?: Function;
}

/**
 * @class
 * PopoutWrapper
 */
class CardClass extends Listener {
    user: IUserModel;
    photos: string[];
    id: string;
    useBlure: true;
    buttons: IButtons;
    placeholder: boolean;
    funcDislike: Function;
    funcLike: Function;
    funcReturn: Function;

    /**
     * Создает экземпляр всплывающего окна
     *
     * @constructor
     * @this  {CardClass}
     * @param {ICardClass} context
     */
    constructor({
        user = {},
        photos = [],
        id,
        useBlure = true,
        placeholder = false,
        buttons = {
            dislike: 'active',
            return: 'disable',
            like: 'active'
        },
        funcDislike,
        funcLike,
        funcReturn
    }: ICardClass) {
        super();
        this.user = user;
        this.photos = photos;
        this.buttons = buttons;
        this.id = id;
        this.useBlure = useBlure;
        this.placeholder = placeholder;
        this.funcDislike = funcDislike;
        this.funcLike = funcLike;
        this.funcReturn = funcReturn;
        this._draw();
    }

    /**
     * Удаляет карточку
     *
     * @this  {CardClass}
     */
    destroy(): void {
        this.deleteListeners();
    }

    /**
     * Создает карточку
     *
     * @this  {CardClass}
     */
    _draw(): void {
        const card = new Card({
            disablePoints: this.photos.length <= 1,
            disableLeftArrow: this.photos.length <= 1,
            disableRightArrow: this.photos.length <= 1,
            user: {
                ...this.user,
                buttons: this.buttons
            },
            photos: this.photos,
            horizontal: true
        }).render();
        document.getElementById(this.id).innerHTML = card;

        if (this.placeholder) {
            this.setPlaceHolder(true);
        } else {
            if (!this.useBlure) {
                const imgs = <HTMLCollection>(
                    document.getElementsByClassName('photo-block__img')
                );
                if (imgs.length > 0) {
                    const img = <HTMLImageElement>imgs[0];
                    const rgbBackground = getAverageRGB(img);
                    img.style.backgroundColor = `rgb(${rgbBackground.r},${rgbBackground.g},${rgbBackground.b})`;
                }
            } else {
                const imgs = document.getElementsByClassName(
                    'photo-block__bg-div'
                );
                if (imgs.length > 0) {
                    const img = <HTMLImageElement>imgs[0];
                    img.style.backgroundColor = 'black';
                    img.style.visibility = 'visible';
                }
            }

            if (this.buttons.dislike && this.funcDislike) {
                this.registerListener({
                    element: <HTMLElement>(
                        document.getElementById('home-commands__dislike')
                            .parentNode
                    ),
                    type: 'click',
                    listener: (e) => {
                        this.funcDislike(e);
                    }
                });
            }

            if (this.buttons.like && this.funcLike) {
                this.registerListener({
                    element: <HTMLElement>(
                        document.getElementById('home-commands__like')
                            .parentNode
                    ),
                    type: 'click',
                    listener: (e) => {
                        this.funcLike(e);
                    }
                });
            }

            if (this.buttons.return && this.funcReturn) {
                this.registerListener({
                    element: <HTMLElement>(
                        document.getElementById('home-commands__like')
                            .parentNode
                    ),
                    type: 'click',
                    listener: (e) => {
                        this.funcReturn(e);
                    }
                });
            }
        }
    }

    /**
     * Указывает состояние загрузки
     * @param {boolean} placeholder
     */
    setPlaceHolder(placeholder: boolean): void {
        if (placeholder) {
            document.getElementById(this.id).classList.add('placeholder-item');
        } else {
            document
                .getElementById(this.id)
                .classList.remove('placeholder-item');
        }
    }
}

export default CardClass;

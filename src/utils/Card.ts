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
    element: HTMLElement;
    currentPhotoId = 0;

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
        this.element = document.getElementById(this.id);
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
            disablePoints: false,
            disableLeftArrow: true,
            disableRightArrow: this.photos.length <= 1,
            user: {
                ...this.user,
                buttons: this.buttons
            },
            photos: this.photos,
            horizontal: true
        }).render();
        this.element.innerHTML = card;

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

            this.registerListener({
                element: <HTMLElement>(
                    document.querySelector('.photo-block__arrow_left')
                ),
                type: 'click',
                listener: () => {
                    this.onArrowClick(true);
                }
            });

            this.registerListener({
                element: <HTMLElement>(
                    document.querySelector('.photo-block__arrow_right')
                ),
                type: 'click',
                listener: () => {
                    this.onArrowClick(false);
                }
            });
        }
    }

    /**
     *
     * @param {boolean} leftArrow
     */
    onArrowClick(leftArrow?: boolean): void {
        let arrowClass = 'photo-block__arrow_right';
        if (leftArrow) {
            arrowClass = 'photo-block__arrow_left';
        }
        this.element.querySelector(`.${arrowClass}`).classList.add('hidden');

        if (leftArrow && this.currentPhotoId > 0) {
            this.currentPhotoId -= 1;
        } else if (!leftArrow && this.currentPhotoId + 1 < this.photos.length) {
            this.currentPhotoId += 1;
        }

        if (this.currentPhotoId === 0) {
            this.element
                .querySelector('.photo-block__arrow_left')
                .classList.add('hidden');
        } else {
            this.element
                .querySelector('.photo-block__arrow_left')
                .classList.remove('hidden');
        }

        if (this.currentPhotoId + 1 === this.photos.length) {
            this.element
                .querySelector('.photo-block__arrow_right')
                .classList.add('hidden');
        } else {
            this.element
                .querySelector('.photo-block__arrow_right')
                .classList.remove('hidden');
        }

        const img = <HTMLImageElement>(
            this.element.querySelector('.photo-block__img')
        );
        const imgBg = <HTMLImageElement>(
            this.element.querySelector('.photo-block__bg')
        );

        img.src = this.photos[this.currentPhotoId];
        imgBg.src = this.photos[this.currentPhotoId];

        this.element.querySelectorAll('.photo-block__point').forEach((item) => {
            item.classList.add('photo-block__point_disabled');
            item.classList.remove('photo-block__point_active');
        });

        const currentPoint = this.element.querySelector(
            `.photo-block__point[data-id="${this.currentPhotoId}"]`
        );

        currentPoint.classList.remove('photo-block__point_disabled');
        currentPoint.classList.add('photo-block__point_active');
    }

    /**
     * Указывает состояние загрузки
     * @param {boolean} placeholder
     */
    setPlaceHolder(placeholder: boolean): void {
        if (placeholder) {
            this.element.classList.add('placeholder-item');
        } else {
            this.element.classList.remove('placeholder-item');
        }
    }

    /**
     *
     * @param right Движение картинки
     */
    swipe(right?: boolean): void {
        if (right) {
            this.element.children[0].classList.add('card__swipe_right');
        } else {
            this.element.children[0].classList.add('card__swipe_left');
        }
    }
}

export default CardClass;

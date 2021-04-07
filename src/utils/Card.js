import Card from '../components/Card/Card.js';
import Listener from './Listener.js';
import { getAverageRGB } from '../utils/img.js';

/**
 * @class
 * PopoutWrapper
 */
class CardClass extends Listener {
    /**
     * Создает экземпляр всплывающего окна
     *
     * @constructor
     * @this  {CardClass}
     * @param {{user:{}, photos:[], id: String, useBlure: true, buttons:{like:'active'|'disable', dislike:'active'|'disable', return:'active'|'disable'}, placeholder: false, funcDislike: Function, funcLike: Function, funcReturn: Function}} context
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
    }) {
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
    destroy() {
        this.deleteListeners();
    }

    /**
     * Создает карточку
     *
     * @this  {CardClass}
     */
    _draw() {
        console.log({
            user: {
                ...this.user,
                buttons: this.buttons
            },
            photos: this.photos,
            horizontal: true
        });
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
                const imgs = document.getElementsByClassName(
                    'photo-block__img'
                );
                if (imgs.length > 0) {
                    const rgbBackground = getAverageRGB(imgs[0]);
                    imgs[0].style.backgroundColor = `rgb(${rgbBackground.r},${rgbBackground.g},${rgbBackground.b})`;
                }
            } else {
                const imgs = document.getElementsByClassName(
                    'photo-block__bg-div'
                );
                if (imgs.length > 0) {
                    imgs[0].style.backgroundColor = 'black';
                    imgs[0].style.visibility = 'visible';
                }
            }

            if (this.buttons.dislike && this.funcDislike) {
                this.registerListener({
                    element: document.getElementById('home-commands__dislike')
                        .parentNode,
                    type: 'click',
                    listener: (e) => {
                        this.funcDislike(e);
                    }
                });
            }

            if (this.buttons.like && this.funcLike) {
                this.registerListener({
                    element: document.getElementById('home-commands__like')
                        .parentNode,
                    type: 'click',
                    listener: (e) => {
                        this.funcLike(e);
                    }
                });
            }

            if (this.buttons.return && this.funcReturn) {
                this.registerListener({
                    element: document.getElementById('home-commands__like')
                        .parentNode,
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
     * @param {Boolean} placeholder
     */
    setPlaceHolder(placeholder) {
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

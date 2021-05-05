import BaseController from './BaseController';
import HomeView from '../view/HomeView/HomeView';
import CardClass from '../utils/Card';
import { IUserModel } from '../models/UserModel';
import feedModel from '../models/FeedModel';
import { handleReactionPromise, getFeed } from '../utils/helpers';
import Context from '../utils/Context';

/**
 * @class
 * Контроллер логина
 */
class HomeController extends BaseController {
    id = 'home-card';
    userData: IUserModel = {};
    card: CardClass = null;

    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {HomeController}
     */
    constructor() {
        super({ view: new HomeView() });
    }

    finish(): void {
        this.deleteListeners();
        this.destroyCard();
    }

    /**
     * Запускает контроллер
     * @param {Context} queryParams
     */
    start(queryParams: Context): void {
        this.queryParams = queryParams;
        super
            .auth()
            .then(() => {
                this.view.show();
                this.drawLoaderPlaceholder();
                getFeed.call(this);
            })
            .catch((reason) => {
                console.error(reason);
            });
    }

    destroyCard(): void {
        if (this.card) {
            this.card.destroy();
        }
    }

    deleteCard(): void {
        document.getElementById(this.id).innerHTML = '';
    }

    showEmptyFeed(): void {
        this.destroyCard();
        this.card = new CardClass({
            id: this.id,
            buttons: {},
            placeholder: false
        });
    }

    drawLoaderPlaceholder(): void {
        this.destroyCard();
        this.card = new CardClass({
            id: this.id,
            buttons: {},
            placeholder: true
        });
    }

    redrawCard(): void {
        this.destroyCard();
        this.card = new CardClass({
            user: this.userData,
            photos: this.userData.photos,
            id: this.id,
            funcLike: this.onLike.bind(this),
            funcDislike: this.onDislike.bind(this),
            buttons: {
                like: 'active',
                dislike: 'active'
            }
        });
    }

    onLike(): void {
        this.card.swipe(true);
        setTimeout(() => {
            this.card.setPlaceHolder(true);
            feedModel
                .reactCurrent('like')
                .then(handleReactionPromise.bind(this))
                .catch((likeReason) => {
                    console.error('Like error - ', likeReason);
                });
        }, 500);
    }

    onDislike(): void {
        this.card.swipe(false);
        setTimeout(() => {
            this.card.setPlaceHolder(true);
            feedModel
                .reactCurrent('skip')
                .then(handleReactionPromise.bind(this))
                .catch((likeReason) => {
                    console.error('Like error - ', likeReason);
                });
        }, 500);
    }
}

export default HomeController;

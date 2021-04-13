import BaseController from './BaseController';
import HomeView from '../view/HomeView/HomeView';
import eventBus from '../utils/eventBus';
import Events from '../consts/events';
import CardClass from '../utils/Card';
import Routes from '../consts/routes';
import userModel, { IUserModel } from '../models/UserModel';
import feedModel from '../models/FeedModel';
import Context from '../utils/Context';
import { IResponseData } from '../utils/helpers';

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
        this.destroyCard();
    }

    /**
     * Запускает контроллер
     */
    start(queryParams: Context): void {
        this.queryParams = queryParams;
        userModel
            .auth()
            .then((response: Response) => {
                if (!response.ok) {
                    eventBus.emit(Events.routeChange, Routes.loginRoute);
                    return;
                }
                eventBus.emit(Events.updateAvatar);

                const json = response.json;

                this.view.show();
                this.drawLoaderPlaceholder();

                if (json.error) {
                    eventBus.emit(Events.formError);
                    return;
                }

                feedModel.get()
                    .then((feedResponse: IResponseData)  => {
                        if (!feedResponse.ok) {
                            eventBus.emit(Events.routeChange, Routes.loginRoute);
                            return;
                        }
                        this.card.setPlaceHolder(false);

                        this.userData = feedModel.getCurrent().json;
                        if (!this.userData) {
                            this.showEmptyFeed();
                            return;
                        }

                        this.redrawCard();
                    })
                    .catch((reason) => {
                        console.error('Feed - error: ', reason);
                    });
            })
            .catch((reason) => {
                eventBus.emit(Events.routeChange, Routes.loginRoute);
                console.error('Auth - error: ', reason);
            });
    }

    destroyCard(): void {
        if (this.card) {
            this.card.destroy();
        }
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
            id: this.id
        });
    }
}

export default HomeController;

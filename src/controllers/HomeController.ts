import BaseController from './BaseController';
import HomeView from '../view/HomeView/HomeView';
import eventBus from '../utils/eventBus';
import Events from '../consts/events';
import CardClass from '../utils/Card';
import Routes from '../consts/routes';
import userModel, { IUserModel } from '../models/UserModel';

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
    start(): void {
        userModel
            .auth()
            .then((response: Response) => {
                if (!response.ok) {
                    eventBus.emit(Events.routeChange, Routes.loginRoute);
                }

                const json = response.json;

                this.view.show();
                this.drawLoaderPlaceholder();

                if (json.error) {
                    eventBus.emit(Events.formError);
                } else {
                    this.card.setPlaceHolder(false);
                    this.userData = <IUserModel>json;
                    this.redrawCard();
                }
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
            photos: [window.localStorage.getItem('u-avatar')],
            id: this.id
        });
    }
}

export default HomeController;

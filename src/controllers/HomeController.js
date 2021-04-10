import BaseController from './BaseController.js';
import HomeView from '../view/HomeView/HomeView.js';
import eventBus from '../utils/eventBus.js';
import Events from '../consts/events.js';
import CardClass from '../utils/Card.js';
import Routes from '../consts/routes.js';
import userModel from '../models/UserModel.js';

/**
 * @class
 * Контроллер логина
 */
class HomeController extends BaseController {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {HomeController}
     */
    constructor() {
        super(new HomeView());
        this.id = 'home-card';
        this.userData = {};
        this.card = null;
    }

    finish() {
        this.destroyCard();
    }

    /**
     * Запускает контроллер
     */
    start() {
        userModel.auth()
            .then(response => {
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

                    this.userData = json;

                    this.redrawCard();
                }
            })
            .catch(reason => {
                eventBus.emit(Events.routeChange, Routes.loginRoute);
                console.error('Auth - error: ', reason);
            });
    }

    destroyCard() {
        if (this.card) {
            this.card.destroy();
        }
    }

    drawLoaderPlaceholder() {
        this.destroyCard();
        this.card = new CardClass({
            id: this.id,
            buttons: {},
            placeholder: true
        });
    }

    redrawCard() {
        this.destroyCard();
        this.card = new CardClass({
            user: this.userData,
            photos: [window.localStorage.getItem('u-avatar')],
            id: this.id
        });
    }
}

export default HomeController;

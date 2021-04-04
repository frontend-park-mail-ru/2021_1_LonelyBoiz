import BaseController from './BaseController.js';
import HomeView from '../view/HomeView/HomeView.js';
import eventBus from '../utils/eventBus.js';
import Events from '../consts/events.js';
import { getCurentUsersData } from '../models/UserModel.js';
import CardClass from '../utils/Card.js';

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
        this.card;
    }

    finish() {
        this.destroyCard();
    }

    /**
     * Запускает контроллер
     */
    start() {
        this.view.show();
        this.drawLoaderPlaceholder();

        getCurentUsersData()
            .then((json) => {
                if (json.error) {
                    eventBus.emit(Events.formError);
                } else {
                    this.card.setPlaceHolder(false);

                    console.log(json);
                    this.userData = json;

                    this.userData.age = Math.floor(
                        (new Date() - new Date(json.birthday * 1000)) /
                            (1000 * 3600 * 24 * 365)
                    );

                    this.redrawCard();
                }
            })
            .catch((reason) => {
                console.error('getCurentUsersData - error: ', reason);
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

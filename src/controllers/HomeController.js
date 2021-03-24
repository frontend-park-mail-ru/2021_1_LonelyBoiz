import BaseController from './BaseController.js';
import HomeView from '../view/HomeView/HomeView.js';
import eventBus from '../utils/eventBus.js';
import Events from '../consts/events.js';
import Card from '../components/Card/Card.js';
import { getCurentUsersData } from '../models/UserModel.js';
import { getAverageRGB } from '../utils/img.js';

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
    }

    /**
     * Запускает контроллер
     */
    start() {
        this.view.show();
        const card = new Card({
            user: {},
            photos: [],
            horizontal: true
        }).render();
        document.getElementById('home-card').innerHTML = card;
        document.getElementById('home-card').classList.add('placeholder-item');

        getCurentUsersData()
            .then((json) => {
                document
                    .getElementById('home-card')
                    .classList.remove('placeholder-item');
                if (json.error) {
                    eventBus.emit(Events.formError);
                } else {
                    console.log(json);
                    const user = {
                        name: json.name,
                        avatar: window.localStorage.getItem('u-avatar'),
                        geo: json.geo,
                        city: json.city,
                        instagram: json.instagram,
                        description: json.description
                    };
                    if (json.birthday) {
                        user.age = Math.floor(
                            (new Date() - new Date(json.birthday)) /
                                (1000 * 3600 * 24 * 365)
                        );
                    }
                    const card = new Card({
                        user: user,
                        photos: [window.localStorage.getItem('u-avatar')],
                        horizontal: true
                    }).render();
                    document.getElementById('home-card').innerHTML = card;

                    const useBlure = false;
                    if (useBlure) {
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
                            imgs[0].style.backgroundColor = `black`;
                            imgs[0].style.visibility = `visible`;
                        }
                    }
                }
            })
            .catch((reason) => {
                console.error('getCurentUsersData - error: ', reason);
            });
    }
}

export default HomeController;

import BaseController from './BaseController.js';
import HomeView from '../view/HomeView/HomeView.js';
import eventBus from '../utils/eventBus.js';
import Events from '../consts/events.js';
import Card from '../components/Card/Card.js';
import { getCurentUsersData } from '../models/UserModel.js';

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
        getCurentUsersData()
            .then((json) => {
                if (json.error) {
                    eventBus.emit(Events.formError);
                } else {
                    const card = new Card({
                        user: {
                            name: json.name,
                            age: 20,
                            avatar: json.avatar,
                            geo: json.geo,
                            city: json.city,
                            instagram: json.instagram,
                            description: json.description
                        },
                        photos: [
                            'img/img.png',
                            'img/img.png',
                            'img/img.png',
                            'img/img.png',
                            'img/img.png'
                        ],
                        horizontal: true
                    }).render();
                    document.getElementById('home-card').innerHTML = card;
                }
            })
            .catch((reason) => {
                const json = {
                    name: 'Denis',
                    mail: 'wd055@mail.ru',
                    city: 'Moscow',
                    instagram: 'denis_vlas',
                    sex: 'female',
                    datePreference: 'male',
                    birthday: '2000-02-03'
                };
                const card = new Card({
                    user: {
                        name: json.name,
                        avatar: json.avatar,
                        geo: json.geo,
                        city: json.city,
                        instagram: json.instagram,
                        description: json.description
                    },
                    photos: [
                        'img/img.png',
                        'img/img.png',
                        'img/img.png',
                        'img/img.png',
                        'img/img.png'
                    ],
                    horizontal: true
                }).render();
                document.getElementById('home-card').innerHTML = card;        console.error('getCurentUsersData - error: ', reason);
            });
    }
}

export default HomeController;

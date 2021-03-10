import BaseController from './BaseController.js';
import HomeView from '../view/HomeView/HomeView.js';
import eventBus from '../utils/eventBus.js';
import Events from '../consts/events.js';
import Card from '../components/Card/Card.js';

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
        this.setCard();
    }

    setCard() {
        const card = new Card({
            user: {
                name: 'Лена',
                age: 20,
                avatar: 'img/img.png',
                geo: '1 КМ',
                city: 'Москва',
                instagram: 'denis_vlas',
                description:
                    'QWEQWEQWEHQWIUDGQHWDB ouebo hwbfk erfhwehg oiur irb lisrijjrblvbfljv brljv dgj berjb s'
            },
            photos: ['img/img.png', 'img/img.png', 'img/img.png'],
            horizontal: true
        }).render();
        document.getElementById('home-card').innerHTML = card;
    }
}

export default HomeController;

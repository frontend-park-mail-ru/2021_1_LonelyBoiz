import BaseController from './BaseController.js';
import SearchView from '../view/SearchView/SearchView.js';
import eventBus from '../utils/eventBus.js';
import Events from '../consts/events.js';
import Card from '../components/Card/Card.js';

/**
 * @class
 * Контроллер логина
 */
class SearchController extends BaseController {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {SearchController}
     */
    constructor() {
        super(new SearchView());

        this.addCards();

        eventBus.connect(Events.formInput, this.addCards);
        this.registerListener({
            element: document.getElementById('test1'),
            type: 'keyup',
            listener: (e) => {
                e.preventDefault();
                if (e.key === 'Enter' || e.keyCode === 13) {
                    eventBus.emit(Events.formInput, {
                        value: document.getElementById('test1').value
                    });
                }
            }
        });
    }

    addCards() {
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
            vertical: true
        }).render();
        document.getElementById('search-feed').innerHTML += card;
    }
}

export default SearchController;

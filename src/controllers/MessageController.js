import BaseController from './BaseController.js';
import MessageView from '../view/MessageView/MessageView.js';
import eventBus from '../utils/eventBus.js';
import Events from '../consts/events.js';

/**
 * @class
 * Контроллер логина
 */
class MessageController extends BaseController {
    /**
     * Создает экземпляр ввода
     *
     * @constructor
     * @this  {MessageController}
     */
    constructor() {
        super(new MessageView());
    }

    setCard() {
        document.getElementById('home-card').innerHTML;
    }
}

export default MessageController;

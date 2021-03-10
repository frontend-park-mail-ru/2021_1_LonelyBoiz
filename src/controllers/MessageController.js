import BaseController from './BaseController.js';
import MessageView from '../view/MessageView/MessageView.js';

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
}

export default MessageController;

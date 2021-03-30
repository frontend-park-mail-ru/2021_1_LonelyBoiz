import Snackbar from '../components/Snackbar/Snackbar.js';
import eventBus from '../utils/eventBus.js';
import Events from '../consts/events.js';

/**
 * @class
 * Объект синглтон для управления уведомлениями
 */
class Notifications {
    static instance = null;

    /**
     * Создает экземпляр Notifications
     *
     * @constructor
     * @this  {Notifications}
     */
    constructor() {
        eventBus.connect(Events.pushNotifications, this.push);

        const newElem = document.createElement('div');
        newElem.id = 'notifications';
        newElem.classList.add('notifications');

        this.rootElement = document
            .getElementsByTagName('body')[0]
            .appendChild(newElem);
    }

    /**
     * Выдает экземпляр синглтона. В случае отсутствия - создает
     *
     * @return {Notifications} экземпляр объекта
     */
    static getInstance() {
        if (!Notifications.instance) {
            Notifications.instance = new Notifications();
        }

        return Notifications.instance;
    }

    /**
     * Добавляет уведомление
     * @param {{ children: Any, duration?: Number }} param0
     */
    push({ children, duration = 4000 }) {
        const insertionElem = document.createElement('div');
        insertionElem.innerHTML = new Snackbar({
            children,
            closing: true
        }).render();
        const newElem = Notifications.getInstance().rootElement.appendChild(
            insertionElem
        );

        setTimeout(() => {
            newElem.children[0].classList.remove('snackbar-closing');
            setTimeout(() => {
                newElem.children[0].classList.add('snackbar-closing');
                setTimeout(() => {
                    newElem.remove();
                }, 500);
            }, duration);
        }, 100);
    }
}

export default Notifications.getInstance();

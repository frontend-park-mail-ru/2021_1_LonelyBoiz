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
        newElem.classList.add('snackbar-desktop');

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
     * @param {{ before: Any, children: Any, after: Any, duration?: Number }} param0
     */
    push({ before, children, after, duration = 4000 }) {
        const rootElement = Notifications.getInstance().rootElement;
        const insertionElem = document.createElement('div');
        insertionElem.innerHTML = new Snackbar({
            before,
            children,
            after,
            closing: true
        }).render();

        const newElem = rootElement.insertBefore(
            insertionElem.firstChild,
            rootElement.firstChild
        );

        console.log(newElem);

        setTimeout(() => {
            newElem.classList.remove('snackbar-closing');
            setTimeout(() => {
                newElem.classList.add('snackbar-closing');
                setTimeout(() => {
                    newElem.remove();
                }, 500);
            }, duration);
        }, 100);
    }
}

export default Notifications.getInstance();

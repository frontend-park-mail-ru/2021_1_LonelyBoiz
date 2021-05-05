import Snackbar from '../components/Snackbar/Snackbar';
import eventBus from '../utils/eventBus';
import Events from '../consts/events';
import IconClass from '../components/Icon/Icon';
import { IconsSrc } from '../consts/icons';

export interface INotificationsPush {
    before?: string;
    children?: string;
    after?: string;
    duration?: number;
    status?: 'error';
}

/**
 * @class
 * Объект синглтон для управления уведомлениями
 */
class Notifications {
    static instance: Notifications = null;
    rootElement: HTMLElement;

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

        this.rootElement = document.getElementsByTagName('body')[0].appendChild(newElem);
    }

    /**
     * Выдает экземпляр синглтона. В случае отсутствия - создает
     *
     * @return {Notifications} экземпляр объекта
     */
    static getInstance(): Notifications {
        if (!Notifications.instance) {
            Notifications.instance = new Notifications();
        }

        return Notifications.instance;
    }

    /**
     * Добавляет уведомление
     * @param {INotificationsPush} param
     */
    push({ before, children, after, duration = 4000, status }: INotificationsPush): void {
        if (status === 'error') {
            before = new IconClass({
                iconCode: IconsSrc.error_circle,
                iconClasses: 'error-icon'
            }).render();
        }

        const rootElement = Notifications.getInstance().rootElement;
        const insertionElem = document.createElement('div');
        insertionElem.innerHTML = new Snackbar({
            before,
            children,
            after,
            closing: true
        }).render();

        const newElem = <HTMLElement>(
            rootElement.insertBefore(insertionElem.firstChild, rootElement.firstChild)
        );

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

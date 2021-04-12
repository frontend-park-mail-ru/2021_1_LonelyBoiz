interface IListener {
    element: HTMLElement;
    type: string;
    listener: EventListener;
}

/**
 * @class
 * Listener
 */
class Listener {
    eventListeners: IListener[] = [];

    /**
     * Цепляет обработчик к событию и сохранят его
     * @this  {BaseController}
     * @param {{element, type, listener}} subscriber объект, который хранит в себе информацию о владельце
     */
    registerListener(subscriber: IListener): void {
        subscriber.element.addEventListener(
            subscriber.type,
            subscriber.listener
        );
        this.eventListeners.push(subscriber);
    }

    /**
     * Удаляет все обработчики, добавленные контроллером
     */
    deleteListeners(): void {
        this.eventListeners = this.eventListeners.reduce((empty, curr) => {
            curr.element.removeEventListener(curr.type, curr.listener);
            return empty;
        }, []);
    }
}

export default Listener;

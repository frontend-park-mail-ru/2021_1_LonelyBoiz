import Context from './Context';
import DragableListController from '../components/DragableList/DragableList';
import Listener from './Listener';
import { arrayMove } from './helpers';

/**
 * @class
 * Объект синглтон для управления уведомлениями
 */
class DragableListClass extends Listener {
    list: string[];
    onDrag: Function = null;
    root: HTMLElement;

    /**
     * Создает экземпляр DragableList
     *
     * @constructor
     * @this  {DragableList}
     */
    constructor(root: HTMLElement, list: string[], onDrag?: (from: number, to: number) => Context) {
        super();
        this.list = list;
        this.root = root;
        this.onDrag = onDrag;
        this.render();
    }

    render(): void {
        this.deleteListeners();

        this.root.innerHTML = new DragableListController({
            list: this.list
        }).render();

        const list = this.root.firstElementChild;

        Object.entries(list.children).forEach((element) => {
            const id = Number(element[0]);
            const item = element[1];
            const chevron = item.querySelector('.dragable-list__chevron');
            const chevronUp = chevron.children[0] as HTMLElement;
            const chevronDown = chevron.children[1] as HTMLElement;
            this.registerListener({
                element: chevronDown,
                type: 'click',
                listener: () => {
                    this.move(id, id + 1);
                }
            });
            this.registerListener({
                element: chevronUp,
                type: 'click',
                listener: () => {
                    this.move(id, id - 1);
                }
            });
        });
    }

    move(from: number, to: number): void {
        arrayMove(this.list, from, to);
        if (this.onDrag) {
            this.onDrag(from, to);
        }
        this.render();
    }

    /**
     * Возвращает исходный массив в новом порядке
     * @returns {Context[]}
     */
    getList(): Context[] {
        return this.list;
    }

    /**
     * Добавить в список элемент
     * @param {string} item
     */
    addToList(item: string): void {
        this.list.push(item);
        this.render();
    }
}

export default DragableListClass;

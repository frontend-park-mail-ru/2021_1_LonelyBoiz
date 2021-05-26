import Context from './Context';
import DragableListController from '../components/DragableList/DragableList';
import Listener from './Listener';
import { arrayMove } from './helpers';

type listType = { str: string; data: Context };

/**
 * @class
 * Объект синглтон для управления уведомлениями
 */
class DragableListClass extends Listener {
    list: listType[];
    onDrag: Function = null;
    root: HTMLElement;

    /**
     * Создает экземпляр DragableList
     *
     * @constructor
     * @this  {DragableList}
     */
    constructor(root: HTMLElement, list: listType[], onDrag?: (from: number, to: number) => Context) {
        super();
        this.list = list;
        this.root = root;
        this.onDrag = onDrag;
        this.render();
    }

    render(): void {
        this.deleteListeners();

        this.root.innerHTML = new DragableListController({
            list: this.list.map((item) => item.str)
        }).render();

        const list = this.root.firstElementChild;

        const elementsList = Object.entries(list.children);
        elementsList.forEach((element, i) => {
            const id = Number(element[0]);
            const item = element[1];
            const chevron = item.querySelector('.dragable-list__chevron');
            const chevronUp = chevron.children[0] as HTMLElement;
            const deleteElement = chevron.children[1] as HTMLElement;
            const chevronDown = chevron.children[2] as HTMLElement;

            if (i === 0) {
                chevronUp.classList.add('div_disabled');
            }
            if (i === elementsList.length - 1) {
                chevronDown.classList.add('div_disabled');
            }
            if (elementsList.length === 1) {
                deleteElement.classList.add('div_disabled');
            }

            this.registerListener({
                element: deleteElement,
                type: 'click',
                listener: () => {
                    this.move(id, -1);
                }
            });
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
        if (to === -1) {
            this.list.splice(from, 1);
        } else {
            arrayMove(this.list, from, to);
        }

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
    addToList(item: listType): void {
        this.list.push(item);
        this.render();
    }
}

export default DragableListClass;

import PopoutWrapper from '../components/PopoutWrapper/PopoutWrapper';
import Listener from './Listener';
import { disableScroll, enableScroll } from './scroll';

interface IPopoutWrapperClass {
    children?: string;
    block?: boolean;
    showBg?: boolean;
}

/**
 * @class
 * PopoutWrapper
 */
class PopoutWrapperClass extends Listener {
    children: string;
    block: boolean;
    showBg: boolean;
    domElement: HTMLElement;
    /**
     * Создает экземпляр всплывающего окна
     *
     * @constructor
     * @this  {PopoutWrapperClass}
     * @param {} context
     */
    constructor({
        children,
        block = true,
        showBg = false
    }: IPopoutWrapperClass) {
        super();
        this.children = children;
        this.block = block;
        this.showBg = showBg;
        this.domElement = null;
        this._draw();
    }

    /**
     * Удаляет всплывающее окно
     *
     * @this  {PopoutWrapperClass}
     */
    destroy(): void {
        enableScroll();
        this.domElement.remove();
        this.deleteListeners();
    }

    /**
     * Создает всплывающее окно
     *
     * @this  {PopoutWrapperClass}
     */
    _draw(): void {
        disableScroll();
        const app = document.getElementById('app');
        const element = <HTMLElement>document.createElement('div');
        element.innerHTML = new PopoutWrapper({
            children: this.children
        }).render();
        this.domElement = <HTMLElement>app.appendChild(element);

        if (this.showBg) {
            this.domElement.children[0].classList.add('popout-wrapper_bg');
        }

        this.registerListener({
            element: <HTMLElement> this.domElement.children[0],
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                if (!this.block) {
                    this.destroy();
                }
            }
        });

        this.registerListener({
            element: <HTMLElement> this.domElement.children[0].children[0],
            type: 'click',
            listener: (e) => {
                e.stopPropagation();
            }
        });
    }
}

export default PopoutWrapperClass;

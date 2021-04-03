import PopoutWrapper from '../components/PopoutWrapper/PopoutWrapper.js';
import Listener from './Listener.js';
import { disableScroll, enableScroll } from './scroll.js';

/**
 * @class
 * PopoutWrapper
 */
class PopoutWrapperClass extends Listener {
    /**
     * Создает экземпляр всплывающего окна
     *
     * @constructor
     * @this  {PopoutWrapperClass}
     * @param {{ children: Any, block: Boolean, showBg: Boolean }} context
     */
    constructor({ children, block = true, showBg = false }) {
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
     * @this  {Spinner}
     */
    destroy() {
        enableScroll();
        this.domElement.remove();
        this.deleteListeners();
    }

    /**
     * Создает всплывающее окно
     *
     * @this  {Spinner}
     */
    _draw() {
        disableScroll();
        const app = document.getElementById('app');
        const element = document.createElement('div');
        element.innerHTML = new PopoutWrapper({
            children: this.children
        }).render();
        this.domElement = app.appendChild(element);

        if (this.showBg) {
            this.domElement.children[0].classList.add('popout-wrapper_bg');
        }

        this.registerListener({
            element: this.domElement.children[0],
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                if (!this.block) {
                    this.destroy();
                }
            }
        });

        this.registerListener({
            element: this.domElement.children[0].children[0],
            type: 'click',
            listener: (e) => {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }
}

export default PopoutWrapperClass;

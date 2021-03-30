import PopoutWrapperClass from './PopoutWrapper.js';
import ScreenSpinner from '../components/ScreenSpinner/ScreenSpinner.js';

/**
 * @class
 * ScreenSpinnerClass
 */
class ScreenSpinnerClass extends PopoutWrapperClass {
    /**
     * Создает экземпляр всплывающего окна
     *
     * @constructor
     * @this  {ScreenSpinnerClass}
     * @param {{ block: Boolean, showBg: Boolean }} context
     */
    constructor({ children, block = true, showBg = false }) {
        super({
            children: new ScreenSpinner().render(),
            block: block,
            showBg: showBg
        });
    }
}

export default ScreenSpinnerClass;

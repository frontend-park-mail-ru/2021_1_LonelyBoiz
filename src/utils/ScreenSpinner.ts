import PopoutWrapperClass from './PopoutWrapper';
import ScreenSpinner from '../components/ScreenSpinner/ScreenSpinner';

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
     * @param {{ block: boolean, showBg: boolean }} context
     */
    constructor(block = true, showBg = false) {
        super({
            children: new ScreenSpinner().render(),
            block: block,
            showBg: showBg
        });
    }
}

export default ScreenSpinnerClass;

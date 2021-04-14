import Component from '../Component';
import template from './PopoutWrapper.hbs';
import './PopoutWrapper.scss';

interface IPopoutWrapper {
    children?: string;
}

/**
 * @class
 * Компонента PopoutWrapper
 */
class PopoutWrapper extends Component {
    /**
     * Создает экземпляр PopoutWrapper
     *
     * @constructor
     * @this  {PopoutWrapper}
     */
    constructor(context?: IPopoutWrapper) {
        super(context, template);
    }
}

export default PopoutWrapper;

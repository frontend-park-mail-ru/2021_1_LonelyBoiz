import Component from '../Component';
import template from './Img.hbs';
import './Img.scss';

interface IImg {
    src: string;
    classes?: string;
    id?: string;
}

/**
 * @class
 * Компонента Img
 */
class Img extends Component {
    /**
     * Создает экземпляр Img
     *
     * @constructor
     * @this  {Img}
     * @param {IImg} context
     */
    constructor(context: IImg) {
        super(context, template);
    }
}

export default Img;

import Component from '../Component';
import template from './Emojis.hbs';
import './Emojis.scss';

interface IEmojis {
    emojis: string[][];
}

/**
 * @class
 * Компонента Emojis
 */
class Emojis extends Component {
    /**
     * Создает экземпляр Emojis
     *
     * @constructor
     * @this  {Emojis}
     * @param {IEmojis} context
     */
    constructor(context: IEmojis) {
        super(context, template);
    }
}

export default Emojis;

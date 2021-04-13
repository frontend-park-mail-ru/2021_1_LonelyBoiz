import Component from '../Component';
import template from './Emojis.hbs';
import './Emojis.css';

interface IEmojies {
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
     * @param {IEmojies} context
     */
    constructor(context: IEmojies) {
        super(context, template);
    }
}

export default Emojis;

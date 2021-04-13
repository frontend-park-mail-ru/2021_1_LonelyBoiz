import Component from '../Component';
import template from './Emojies.hbs';
import './Emojies.css';

interface IEmojies {
    emojies: string[][];
}

/**
 * @class
 * Компонента Emojies
 */
class Emojies extends Component {
    /**
     * Создает экземпляр Emojies
     *
     * @constructor
     * @this  {Emojies}
     * @param {IEmojies} context
     */
    constructor(context: IEmojies) {
        super(context, template);
    }
}

export default Emojies;

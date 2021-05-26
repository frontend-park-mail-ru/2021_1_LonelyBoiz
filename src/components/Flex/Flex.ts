import Component from '../Component';
import template from './Flex.hbs';
import './Flex.scss';

/**
 * @class
 * Компонента Flex
 */
class Flex extends Component {
    /**
     * Создает экземпляр Flex
     *
     * @constructor
     * @this  {Flex}
     * @param {string[]} context
     */
    constructor(array: string[]) {
        super({ array }, template);
    }
}

export default Flex;

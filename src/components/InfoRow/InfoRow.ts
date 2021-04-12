import Component from '../Component';
import template from './InfoRow.hbs';
import './InfoRow.css';

interface IInfoRow {
    iconSrc?: string;
    text?: string;
}

/**
 * @class
 * Компонента InfoRow
 */
class InfoRow extends Component {
    /**
     * Создает экземпляр InfoRow
     *
     * @constructor
     * @this  {InfoRow}
     * @param {IInfoRow} context
     */
    constructor(context?: IInfoRow) {
        super(context, template);
    }
}

export default InfoRow;

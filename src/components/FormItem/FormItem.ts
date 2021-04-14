import Component from '../Component';
import template from './FormItem.hbs';
import './FormItem.scss';

export interface IFormItem {
    id?: string;
    top?: string;
    bottom?: string;
    children?: string;
    valid?: boolean;
    error?: boolean;
    loading?: boolean;
}

/**
 * @class
 * Компонента FormItem
 */
class FormItem extends Component {
    /**
     * Создает экземпляр FormItem
     *
     * @constructor
     * @this  {FormItem}
     * @param {IFormItem} context {id, top, bottom, children, valid|error}
     */
    constructor(context: IFormItem) {
        super(context, template);
    }
}

export default FormItem;

import { IconsSrc } from '../../consts/icons';
import Component from '../Component';
import IconClass from '../Icon/Icon';
import template from './DragableList.hbs';
import './DragableList.scss';

interface IDragableList {
    list: string[];
}

/**
 * @class
 * Компонента DragableList
 */
class DragableListController extends Component {
    /**
     * Создает экземпляр DragableList
     *
     * @constructor
     * @this  {DragableList}
     * @param {IDragableList} context
     */
    constructor(context: IDragableList) {
        super(context, template);
        this.context.chevron_down = new IconClass({
            iconClasses: 'reorder__icon',
            iconCode: IconsSrc.chevron_down,
            size: 24
        }).render();
        this.context.chevron_up = new IconClass({
            iconClasses: 'reorder__icon',
            iconCode: IconsSrc.chevron_up,
            size: 24
        }).render();
        this.context.delete = new IconClass({
            iconClasses: 'reorder__icon',
            iconCode: IconsSrc.delete,
            size: 24
        }).render();
    }
}

export default DragableListController;

import Component from '../Component';
import { IconsSrc } from '../../consts/icons';
import IconClass from '../Icon/Icon';
import template from './WriteBar.hbs';
import './WriteBar.scss';

/**
 * @class
 * Компонента WriteBar
 */
class WriteBar extends Component {
    /**
     * Создает экземпляр WriteBar
     *
     * @constructor
     * @this  {WriteBar}
     */
    constructor() {
        super(null, template);
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render(): string {
        this.context.SendMessageIcon = new IconClass({
            iconCode: IconsSrc.send_message_stroke,
            iconClasses: 'pointer-icon'
        }).render();

        return this.template(this.context);
    }
}

export default WriteBar;

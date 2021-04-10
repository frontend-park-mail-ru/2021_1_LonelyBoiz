import Input from '../Input/Input.js';
import { IconsSrc } from '../../consts/icons.js';
import IconClass from '../Icon/Icon.js';
import template from './WriteBar.hbs';

/**
 * @class
 * Компонента WriteBar
 */
class WriteBar {
    /**
     * Создает экземпляр WriteBar
     *
     * @constructor
     * @this  {WriteBar}
     */
    constructor(context) {
        this.template = template;
        this.context = context || {};
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render() {
        this.context.Input = new Input({
            placeholder: 'Сообщение',
            bg_gray: true
        }).render();

        this.context.SendMessageIcon = new IconClass({
            iconCode: IconsSrc.send_message_stroke,
            iconClasses: 'pointer-icon'
        }).render();

        return this.template(this.context);
    }
}

export default WriteBar;

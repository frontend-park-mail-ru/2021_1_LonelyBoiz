import Component from '../Component';
import template from './Button.hbs';
import './Button.scss';

interface IButton {
    type?: 'button' | 'submit';
    id?: string;
    text?: string;
    mode?: 'primary' | 'secondary' | 'destructive' | 'commerce';
}

/**
 * @class
 * Компонента кнопки
 */
class Button extends Component {
    /**
     * Создает экземпляр кнопки
     *
     * @constructor
     * @this  {Button}
     * @param {IButton} context
     */
    constructor(context?: IButton) {
        super(context, template);
        this.context = context || {
            mode: 'primary',
            type: 'submit'
        };
        if (!this.context.type) {
            this.context.type = 'submit';
        }
        if (this.context.mode && this.context.mode === 'secondary') {
            this.context.secondary = true;
        }
        if (this.context.mode && this.context.mode === 'primary') {
            this.context.primary = true;
        }
        if (this.context.mode && this.context.mode === 'destructive') {
            this.context.destructive = true;
        }
        if (this.context.mode && this.context.mode === 'commerce') {
            this.context.commerce = true;
        }
    }
}

export default Button;

import Context from '../../utils/Context';
import Listener from '../../utils/Listener';
import Button from '../Button/Button';
import template from './FilterButton.hbs';
import './FilterButton.scss';

/**
 * @class
 * Компонента кнопки
 */
class FilterButton extends Listener {
    template: Function;
    filters: string[] = ['sepia', 'brownie', 'vintage', 'velvet', 'polaroid', 'kodak'];
    id: string;
    paernt: HTMLElement;
    filter = '';
    callback: Function;

    constructor(id: string, callback?: Function) {
        super();
        this.id = id;
        this.callback = callback;
        this.template = template;
        this.paernt = document.getElementById(this.id);
        this.render();
        this.listen();
    }

    render(): void {
        const context: Context = { buttons: [] };
        for (let i = 0; i < 2; i++) {
            const tmpArr = [];
            for (let j = 0; j < 3; j++) {
                tmpArr.push({
                    button: new Button({
                        text: this.filters[i * 3 + j],
                        mode: 'secondary',
                        type: 'button'
                    }).render(),
                    data: this.filters[i * 3 + j]
                });
            }
            context.buttons.push(tmpArr);
        }

        const text = this.template(context);
        this.paernt.innerHTML = text;
    }

    listen(): void {
        this.filters.forEach((filter) => {
            this.registerListener({
                element: this.paernt.querySelector(`[data-btn=${filter}`),
                type: 'click',
                listener: () => {
                    if (this.callback) {
                        this.callback(filter);
                    }
                    this.filter = filter;
                }
            });
        });
    }
}

export default FilterButton;

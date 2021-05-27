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
    filters: string[] = ['sepia', 'brownie', 'vintage', 'velvet', 'grayscale', 'kodak'];
    id: string;
    parent: HTMLElement;
    filter = '';
    callback: Function;

    constructor(id: string, callback?: Function) {
        super();
        this.id = id;
        this.callback = callback;
        this.template = template;
        this.parent = document.getElementById(this.id);
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
        context.buttons.push([
            {
                button: new Button({
                    text: 'Очистить',
                    mode: 'secondary',
                    type: 'button'
                }).render(),
                data: ''
            }
        ]);

        const text = this.template(context);
        this.parent.innerHTML = text;
    }

    listen(): void {
        this.parent.querySelectorAll('[data-btn]').forEach((item: HTMLElement) => {
            this.registerListener({
                element: item,
                type: 'click',
                listener: () => {
                    if (this.callback) {
                        this.callback(item.dataset.btn);
                    }
                    this.filter = item.dataset.btn;
                }
            });
        });
    }
}

export default FilterButton;

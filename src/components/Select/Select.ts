import Component from '../Component';
import template from './Select.hbs';
import './Select.scss';

type optionsType = { title: string; value: string } | string;

interface ISelect {
    title?: string;
    options: optionsType[];
    disabled?: boolean;
    required?: boolean;
    id?: string;
    class?: string;
    name?: string;
    dataType?: string;
}

/**
 * @class
 * Компонента выбора опций
 */
class Select extends Component {
    /**
     * Создает экземпляр Select
     *
     * @constructor
     * @this  {Select}
     * @param {ISelect} context контекст для выбора опций
     */
    constructor(context?: ISelect) {
        if (typeof context.options[0] === 'string') {
            const options = context.options;
            context.options = [];
            options.forEach((item, i) => {
                const insertion = ({
                    title: item,
                    value: i
                } as unknown) as optionsType;
                context.options.push(insertion);
            });
        }

        super(context, template);
    }
}

export default Select;

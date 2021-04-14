import Component from '../Component';
import template from './Form.hbs';
import './Form.scss';

interface IForm {
    inputs: string[];
    button: string;
}

/**
 * @class
 * Компонента формы
 */
class Form extends Component {
    /**
     * Создает экземпляр формы
     *
     * @constructor
     * @this  {Form}
     * @param {IForm} context контекст для формы
     */
    constructor(context?: IForm) {
        super(context, template);
    }
}

export default Form;

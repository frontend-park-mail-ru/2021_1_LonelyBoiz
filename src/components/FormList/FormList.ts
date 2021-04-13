import Component from '../Component';
import FormItem, { IFormItem } from '../FormItem/FormItem';
import template from './FormList.hbs';

interface IFormList {
    id?: string;
    formList: IFormItem[];
}

/**
 * @class
 * Компонента FormList
 */
class FormList extends Component {
    /**
     * Создает экземпляр FormList
     *
     * @constructor
     * @this  {FormList}
     * @param {IFormList} context
     */
    constructor(context?: IFormList) {
        super(context, template);
    }

    /**
     * Отображает компонент
     * @returns {string} Построенный компонент
     */
    render(): string {
        this.context.FormList = this.context.formList.map((item) => {
            return new FormItem(item).render();
        });
        return this.template(this.context);
    }
}

export default FormList;

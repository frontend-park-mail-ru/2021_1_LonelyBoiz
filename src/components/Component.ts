import { Template } from 'handlebars';
import Context from '../utils/Context';

/**
 * @class
 * Абстрактный класс компоненты Component
 */
abstract class Component {
    context: Context;
    template: Template;

    protected constructor(context?: Context, template?: Template) {
        this.context = { ...context } ?? {};
        this.template = template;
    }

    render(): string {
        return this.template(this.context);
    }
}

export default Component;

const formTemplate = 'Form.hbs';

/**
 * @class
 * Компонента формы
 */
class Form {
    /**
     * Создает экземпляр формы
     *
     * @constructor
     * @this  {Form}
     */
<<<<<<< HEAD
    constructor() {
=======
    constructor (context) {
>>>>>>> 82083a7 (PIC-52: Рефакторить компоненты и вьюхи)
        this.template = Handlebars.templates[formTemplate];
        this.context = context;
    }

    /**
     * Отображает компонент ввода
     * @param {Object} context - Контекст с массивом вводов и кнопкой
     */
<<<<<<< HEAD
    render(context) {
        return this.template(context);
=======
    render () {
        return this.template(this.context);
>>>>>>> 82083a7 (PIC-52: Рефакторить компоненты и вьюхи)
    }
}

export default Form;

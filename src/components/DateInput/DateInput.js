const dateInput = 'DateInput.hbs';

/**
 * @class
 * Компонента установки даты
 */
class DateInput {
    /**
     * Создает экземпляр DateInput
     *
     * @constructor
     * @this  {DateInput}
     */
    constructor () {
        this.template = Handlebars.templates[dateInput];
    }

    /**
     * Отображает компонент установки даты
     */
    render (context) {
        return this.template(context);
    }
}

export default DateInput;

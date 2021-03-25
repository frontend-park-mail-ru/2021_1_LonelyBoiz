import Select from '../Select/Select.js';

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
     * @param {Object} context контекст для установки даты
     */
    constructor(context) {
        this.template = Handlebars.templates[dateInput];
        this.context = context || {};
        this.months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ];

        this.days = Array.from({ length: 30 }, (_, i) => i + 1);
        this.years = (start = 1910, end = new Date().getFullYear() - 17) => {
            const range = [];
            for (let i = start; i < end; i++) {
                range.push(i);
            }
            return range.reverse();
        };
    }

    /**
     * Отображает компонент установки даты
     * @returns {String} Построенный компонент
     */
    render() {
        this.context.monthSelect = new Select({
            disabled: this.context.disabled,
            id: this.context.monthsId,
            class: 'js__date-input__month',
            title: 'Месяц:',
            options: this.months
        }).render();
        this.context.daySelect = new Select({
            disabled: this.context.disabled,
            id: this.context.daysId,
            class: 'js__date-input__day',
            title: 'День:',
            options: this.days
        }).render();
        this.context.yearSelect = new Select({
            disabled: this.context.disabled,
            id: this.context.yearsId,
            class: 'js__date-input__year',
            title: 'Год:',
            options: this.years
        }).render();

        return this.template(this.context);
    }
}

export default DateInput;

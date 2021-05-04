import Component from '../Component';
import Select from '../Select/Select';
import template from './DateInput.hbs';
import './DateInput.scss';

interface IDateInput {
    required?: boolean;
    disabled?: boolean;
    daysId?: string;
    monthsId?: string;
    yearsId?: string;
    id?: string;
}

/**
 * @class
 * Компонента установки даты
 */
class DateInput extends Component {
    months = [
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

    days = Array.from({ length: 30 }, (_, i) => String(i + 1));
    years: string[] = [];

    /**
     * Создает экземпляр DateInput
     *
     * @constructor
     * @this  {DateInput}
     * @param {IDateInput} context контекст для установки даты
     */
    constructor(context?: IDateInput) {
        super(context, template);

        const start = 1910;
        const end = new Date().getFullYear() - 17;
        for (let i = start; i < end; i++) {
            this.years.push(String(i));
        }
        this.years.reverse();
    }

    /**
     * Отображает компонент установки даты
     * @returns {String} Построенный компонент
     */
    render(): string {
        this.context.monthSelect = new Select({
            disabled: this.context.disabled,
            id: this.context.monthsId,
            class: 'js__date-input__month',
            title: 'Месяц:',
            options: this.months,
            required: this.context.required
        }).render();
        this.context.daySelect = new Select({
            disabled: this.context.disabled,
            id: this.context.daysId,
            class: 'js__date-input__day',
            title: 'День:',
            options: this.days,
            required: this.context.required
        }).render();
        this.context.yearSelect = new Select({
            disabled: this.context.disabled,
            id: this.context.yearsId,
            class: 'js__date-input__year',
            title: 'Год:',
            options: this.years,
            required: this.context.required
        }).render();

        return this.template(this.context);
    }
}

export default DateInput;

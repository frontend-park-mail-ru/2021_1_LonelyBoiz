import Button from '../src/components/Button/Button.js';
import Input from '../src/components/Input/Input.js';
import Form from '../src/components/Form/Form.js';
import MainLabel from '../src/components/MainLabel/MainLabel.js';
import DateInput from '../src/components/DateInput/DateInput.js';
import Select from '../src/components/Select/Select.js'
import LoginView from '../src/view/LoginView/LoginView.js';
import SignupView from '../src/view/SignupView/SignupView.js';

import EventBus from "../src/utils/eventBus.js";
import Events from "../src/consts/events.js";


const app = document.getElementById("app");

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const days = Array.from({length: 30}, (_, i) => i + 1);
const years = (start=1910, end=2021) => {
    let range = []
    for (let i = start; i < end; i++) {
        range.push(i)
    }
    return range
}

const dateInput = new DateInput().render({'monthSelect': new Select().render({'title': 'Month:', 'options': months}),
    'daySelect': new Select().render({'title': 'Day:', 'options': days}),
    'yearSelect': new Select().render({'title': 'Year:', 'options': years})})

const renderedForm = new Form().render({
    'inputs': [
        new Input().render({'type': 'text', 'placeholder': 'Почта'}),
        new Input().render({'type': 'text', 'placeholder': 'Имя'}),
        dateInput,
        new Input().render({'type': 'password', 'placeholder': 'Пароль'}),
        new Input().render({'type': 'password', 'placeholder': 'Повторите пароль'}),
    ],
    'button': new Button().render({'text': 'Вход'})
});

const renderValue = new SignupView().render({
    'header': new MainLabel().render({'text': 'PICKle'}),
    'form': renderedForm,
    'signupHref': 'login',
    'error': 'Неправильно введен логин или пароль.Введите пароль заново. что-то пошло не так'
})


app.innerHTML = renderValue

function onSubmit(data) {
    console.log('hello world')
}

EventBus.connect(Events.formSubmitted, onSubmit)
const button = document.querySelector('.button-block__button')
button.addEventListener('click', (e) => {e.preventDefault(); EventBus.emit(Events.formSubmitted);})

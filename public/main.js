import Button from '../src/components/Button/Button.js';
import Input from '../src/components/Input/Input.js';
import Form from '../src/components/Form/Form.js';
import MainLabel from '../src/components/MainLabel/MainLabel.js';
import DateInput from '../src/components/DateInput/DateInput.js';
import Select from '../src/components/Select/Select.js'
import LoginView from '../src/view/LoginView/LoginView.js';
import SignupView from '../src/view/SignupView/SignupView.js';

import EventBus from '../src/utils/eventBus.js';
import Events from '../src/consts/events.js';


const loginView = new LoginView({'signupHref': 'signup', 'error': 'error occurred'}).show();

function onButtonSubmit(data) {
    console.log('hello world')
}

EventBus.connect(Events.formSubmitted, onButtonSubmit)
const button = document.querySelector('.button-block__button')
button.addEventListener('click', (e) => {e.preventDefault(); EventBus.emit(Events.formSubmitted);})

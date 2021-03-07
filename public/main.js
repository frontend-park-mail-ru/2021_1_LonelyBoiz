import Button from '../src/components/Button/Button.js';
import Input from '../src/components/Input/Input.js';
import Form from '../src/components/Form/Form.js';
import LoginView from '../src/view/LoginView/LoginView.js';
import MainLabel from "../src/components/MainLabel/MainLabel.js";

const app = document.getElementById("app");

const form = new Form();

const renderedForm = form.render({
  'inputs': [
      new Input().render({'type': 'text', 'placeholder': 'Почта'}),
      new Input().render({'type': 'password', 'placeholder': 'Пароль'}),
  ],
  'button': new Button().render({'text': 'Вход'})
});

const renderValue = new LoginView().render({
    'header': new MainLabel().render({'text': 'PICKle'}),
    'form': renderedForm,
    'signupHref': 'signup',
    'error': 'Неправильно введен логин или пароль.Введите пароль заново. что-то пошло не так'
    })

app.innerHTML = renderValue

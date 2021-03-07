import Button from '../src/components/Button/Button.js';
import Input from '../src/components/Input/Input.js';
import LoginForm from '../src/components/LoginForm/LoginForm.js';

let app = document.getElementById("app");

let button = new Button();
let input = new Input();
let loginForm = new LoginForm();

//app.innerHTML = button.render({'text': 'Hello there'});
//app.innerHTML = input.render({'type': 'password', 'placeholder': 'Пароль'});
let render_value = loginForm.render({
  'inputs': [
      {'type': 'text', 'placeholder': 'Почта'},
      {'type': 'password', 'placeholder': 'Пароль'},
  ],
  'button': {'text': 'Вход'}
});

console.log(render_value)

app.innerHTML = render_value

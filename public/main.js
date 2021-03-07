import Button from '../src/components/Button/Button.js';
import Input from '../src/components/Input/Input.js';

let app = document.getElementById("app");

let button = new Button();
let input = new Input();

//app.innerHTML = button.render({'text': 'Hello there'});
app.innerHTML = input.render({'type': 'password', 'placeholder': 'Пароль'});

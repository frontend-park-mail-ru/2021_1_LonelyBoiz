import Button from "../src/components/Button/Button.js";

let app = document.getElementById("app");

let button = new Button();

app.innerHTML = button.render();

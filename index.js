const express = require('express');

const app = express();

app.use(express.static('static'));

app.use('/', function (request, response) {
	response.redirect('/home.html');
});

app.use('/index', function (request, response) {
	response.redirect('/home.html');
});

app.listen(3000);

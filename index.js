'use restrict';

const express = require('express');
const path = require('path');
const app = express();

const staticPath = path.resolve(__dirname);
app.use('/', express.static(staticPath));

app.get('/', (request, response) => {
	response.redirect('/public/index.html');
});

app.listen(3000);

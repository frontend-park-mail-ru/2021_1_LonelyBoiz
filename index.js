'use restrict';
const port = process.env.PORT || 3000;

const express = require('express');
const path = require('path');
const app = express();

const projectDir = path.resolve(__dirname);
app.use(express.static(path.join(projectDir, 'public')));
app.use(express.static(projectDir));

app.get('*', (req, res) => {
	res.location(req.originalUrl).sendFile(path.join(projectDir, 'public', 'index.html'));
});

app.listen(port);

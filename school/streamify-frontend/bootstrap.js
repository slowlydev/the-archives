const express = require('express');
const path = require('path');
const app = express();
const port = process.env.REACT_APP_PORT ?? 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (_req, res) => {
	res.status(200).json({ ping: 'pong' });
});

app.get('*', (_req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`express app successfully started - server is running on port ${port}`));

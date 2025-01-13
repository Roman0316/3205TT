const express = require('express');
const path = require('path');

const { urlRouter } = require('./routers/index');
const { ErrorHandler } = require('./middlewares/index');

const app = express();

app.get('/api', (req, res) => {
  res.status(200).json({ status: 'I am OK!' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', urlRouter);
app.use(ErrorHandler);

module.exports = app;

const express = require('express');
const app = express();
const db = require('./db');
const faker = require('faker');
const morgan = require('morgan');
const path = require('path');

app.use(require('body-parser').json());
app.use(morgan('dev'));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

app.get('/api/employees', (req, res, next) => {});

app.get('/api/departments', (req, res, next) => {});

app.delete('/api/employees', (req, res, next) => {});

app.put('api/employees/:id', (req, res, next) => {});

const port = process.env.PORT || 5000;

const init = async () => {
  try {
    await db.syncAndSeed();
    app.listen(port, () => {
      console.log(`listening on port: ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

init();

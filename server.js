const express = require('express');
const app = express();
const db = require('./db');
const faker = require('faker');
const morgan = require('morgan');
const path = require('path');
const { Employee, Department } = db.models;

app.use(require('body-parser').json());
app.use(morgan('dev'));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

app.get('/api/employees', async (req, res, next) => {
  try {
    res.send(await Employee.findAll({ order: [['name', 'asc']] }));
  } catch (err) {
    next(err);
  }
});

app.get('/api/departments', async (req, res, next) => {
    try {
        res.send(await Department.findAll( ))
    }catch(err) {
        next(err)
    }
});

app.delete('/api/employees/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    await employee.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.put('api/employees/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    await employee.update(req.body);
    res.send(friend);
  } catch (err) {
    next(err);
  }
});

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

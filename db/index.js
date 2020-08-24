const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize('postgres://localhost/ACME_db');
const faker = require('faker');

const Employee = conn.define('employee', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
});

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const workForce = [];
  while (workForce.length < 50) {
    workForce.push(
      Employee.create({
        name: faker.name.firstName(),
      })
    );
  }
};

module.exports = {
  model: {
    Employee,
  },
  syncAndSeed,
};

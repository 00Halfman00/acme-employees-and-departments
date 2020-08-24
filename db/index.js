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
    //unique: true,
  },
});

const Department = conn.define('department', {
  name: {
    type: STRING,
  },
});

const departments = [
  { name: 'Employee with no Department' },
  { name: 'Electronics' },
  { name: 'Food Court' },
  { name: 'Sports' },
  { name: 'Apparel' },
  { name: 'Tools' },
];

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const workForce = [];
  while (workForce.length < 50) {
    workForce.push(
      await Employee.create({
        name: faker.name.firstName(),
      })
    );
  }
  await Department.bulkCreate(departments);
};

module.exports = {
  models: {
    Employee,
    Department,
  },
  syncAndSeed,
};

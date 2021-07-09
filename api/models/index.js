const { Sequelize } = require('sequelize');

const CategoriesFactory = require('./Category');
const OperationFactory = require('./Operation');
const UserFactory = require('./User');

const sequelize = new Sequelize(`postgres://${process.env.dbUser}:${process.env.dbPassword}@${process.env.dbHost}/${process.env.dbName}`, {
  logging: false,
});

const Category = CategoriesFactory(sequelize);
const Operation = OperationFactory(sequelize);
const User = UserFactory(sequelize);

User.hasMany(Operation);
Category.hasMany(Operation);

module.exports = {
  conn: sequelize,
  Category,
  Operation,
  User
};
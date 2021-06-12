const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    mail: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false });
  return model;
};
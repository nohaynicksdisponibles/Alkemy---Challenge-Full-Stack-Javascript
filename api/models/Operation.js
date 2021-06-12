const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('operation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    date: {
      type: DataTypes.DATE,
    },
    operation: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false });
  return model;
};
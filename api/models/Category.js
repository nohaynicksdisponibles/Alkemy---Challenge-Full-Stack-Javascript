const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, { timestamps: false });
  return model;
}; 
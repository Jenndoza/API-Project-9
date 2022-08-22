'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT    
    },
    estimatedTime: {
      type: DataTypes.STRING
    },
    materialsNeeded: {
      type: DataTypes.STRING
    }
  }, { sequelize });

  return User;
};
"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please include a name",
          },
          notEmpty: {
            msg: "Please enter a name",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please include a last name",
          },
          notEmpty: {
            msg: "Please enter a last name",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please include an email address",
          },
          notEmpty: {
            msg: "Please enter an email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please include a password",
          },
          notEmpty: {
            msg: "Please enter a password",
          },
        },
      },
    },
    { sequelize }
  );

  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: "user",
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };

  return User;
};

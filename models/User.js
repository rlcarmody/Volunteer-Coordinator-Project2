const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    nickName: DataTypes.STRING,
    isStaff: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    skills: DataTypes.TEXT,
    phone: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  });
  User.prototype.getFullName = function getFullLegalName() {
    return `${this.firstName} ${this.lastName}`;
  };
  User.prototype.authenticate = function authenticate(password) {
    return bcrypt.compare(password, this.password).then(res => res);
  };
  return User;
};

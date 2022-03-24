"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING, allowNull: false },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      phoneNumber: { type: DataTypes.INTEGER, allowNull: false },
      hospital: { type: DataTypes.UUID },
      degree: { type: DataTypes.STRING, allowNull: false },
      professional: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: "doctor",
      freezeTableName: true,
      modelName: "Doctor",
    }
  );
  return Doctor;
};

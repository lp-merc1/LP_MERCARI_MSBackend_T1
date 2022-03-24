"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    async comparePassword(candidatePassword) {
      const user = this;

      try {
        return await bcrypt.compare(candidatePassword, user.password);
      } catch (e) {
        return false;
      }
    }

    toJSON() {
      return { ...this.get(), password: undefined, id: undefined };
    }

    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: true },
      email: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: { type: DataTypes.STRING, allowNull: true },
      password: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      NHID: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      tableName: "user",
      freezeTableName: true,
      modelName: "User",
      hooks: {
        beforeUpdate: async (user, options) => {
          await hashPassword(user);
        },

        beforeCreate: async (user, options) => {
          await hashPassword(user);
        },
      },
    }
  );
  return User;
};

const hashPassword = async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }
};

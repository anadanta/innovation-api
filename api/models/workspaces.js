"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class workspaces extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  workspaces.init(
    {
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      description: DataTypes.STRING,
      cep: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      avenue: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "workspaces",
    }
  );
  return workspaces;
};

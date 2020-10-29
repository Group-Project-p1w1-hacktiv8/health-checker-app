'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Symptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Symptom.belongsToMany(models.User, { through: models.UserSymptom });
    }
  };
  Symptom.init({
    name: DataTypes.STRING,
    api_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Symptom',
  });
  return Symptom;
};
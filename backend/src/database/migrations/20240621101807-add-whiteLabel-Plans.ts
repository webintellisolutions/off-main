import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn("Plans", "whiteLabel", {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("Plans", "whiteLabel");
  }
};

import { QueryInterface, DataTypes } from "sequelize";
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn("Whatsapps", "number", {
      type: DataTypes.TEXT,
      allowNull: true,
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("Whatsapps", "number");
  },
};

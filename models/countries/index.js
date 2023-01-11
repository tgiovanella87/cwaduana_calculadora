import { DataTypes } from "sequelize";
import { Database } from "../../config/Database";

const Countries = Database.define(
  "countries",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initials: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const findAllCountries = async () => {
  return await Countries.findAll({
    attributes: ["id", "description", "initials"],
  });
};

export { findAllCountries };

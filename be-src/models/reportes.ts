import { sequelize } from "./conn";
import { DataTypes, Model } from "sequelize";

export class Report extends Model {}

Report.init(
  {
    reportName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    moreAbout: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Report",
  }
);

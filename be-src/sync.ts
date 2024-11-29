import { sequelize } from "./models/conn";

sequelize
  .sync({ force: true })
  .then((res) => console.log("Database synchronized", res))
  .catch(console.error);

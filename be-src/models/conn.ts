import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(process.env.URL_POSTGRES);

async function TestConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexion establecida");
  } catch (error) {
    console.log("no se ha podido conectar:", error);
  }
}

TestConnection();

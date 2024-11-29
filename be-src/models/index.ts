import { User } from "../models/users";
import { Mascota } from "../models/mascotas";
import { Report } from "../models/reportes";
import { Auth } from "./auth";

User.hasMany(Mascota);
Mascota.hasMany(Report);
Mascota.belongsTo(User);
User.hasMany(Report);
Report.belongsTo(User);
Auth.belongsTo(User);

export { User, Mascota, Report, Auth };

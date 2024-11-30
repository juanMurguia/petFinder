import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as path from "path";
import { sequelize } from "./connectionDB";
import { User, Mascota, Report } from "./associations/associations";
import * as bodyParser from "body-parser";
import * as sgMail from "@sendgrid/mail";
import {
  autenticarToken,
  autenticarUser,
  myMiddlewareUser,
  getMe,
  updatePassword,
} from "./controllers/authControllers";

import { updateUser, verifyEmail } from "./controllers/userControllers";

import {
  actualizarMascota,
  createPet,
  eliminarPet,
  mascotasCerca,
  myPetsAll,
} from "./controllers/mascotaControllers";

import { createReport } from "./controllers/reportControllers";

//const
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//use
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://desafio-apx-pet-finder.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());

app.use(
  cors({
    origin: "https://desafio-apx-pet-finder.onrender.com",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

//

app.listen(port, () => {
  console.log("Escuchando en el puerto:", port);
});

app.get("/test", async (req, res) => {
  res.json("Api test");
});

app.post("/auth", async (req, res) => {
  if (req.body) {
    const user = await autenticarUser(req.body);
    res.json(user);
  } else {
    res.status(400).json("No hay data en el body");
  }
});

app.post("/auth/token", async (req, res) => {
  if (!req.body) {
    res.status(400).json("No se encontro data en el body");
  } else {
    const tokenObject = await autenticarToken(req.body);
    res.json(tokenObject);
  }
});

app.use("/me", (req, res) => {
  const reqUsuario = myMiddlewareUser(req);
  if (reqUsuario) {
    res.json(reqUsuario);
  } else {
    throw "error en el request, no hay data en el header Authorization: [bearer token] o el token es invalido";
  }
});

app.post("/me", async (req, res) => {
  try {
    const userFind = await getMe(req);
    res.json(userFind);
  } catch (error) {
    res.status(400).json("error:", error);
  }
});

app.post("/verify-email", async (req, res) => {
  if (req.body.email) {
    const userEmail = await verifyEmail(req.body);
    res.json(userEmail);
  } else {
    res.status(400).json("No hay data en el body");
  }
});

app.post("/update-data", async (req, res) => {
  if (req.body.userId) {
    const userActualizado = await updateUser(req.body);
    res.json(userActualizado);
  } else {
    res.status(400).json("No hay userId en el cuerpo de la solicitud");
  }
});

app.post("/update-password", async (req, res) => {
  const { userId, password } = req.body;
  if (req.body.userId) {
    const passwordUpdate = await updatePassword(userId, password);
    res.json(passwordUpdate);
  } else {
    res.status(400).json("No hay data en el body");
  }
});

app.post("/create-pet", async (req, res) => {
  if (req.body.userId) {
    const petCreated = await createPet(req.body);
    res.json(petCreated);
  } else {
    res.status(400).json("Faltan datos necesarios");
  }
});

app.get("/mascotas-cerca-de", async (req, res) => {
  if (req.query.lng && req.query.lat) {
    const results = await mascotasCerca(req);
    res.json(results);
  } else {
    res.status(400).json("Faltan datos");
  }
});

app.get("/mis-mascotas", async (req, res) => {
  if (req.query.userId) {
    const myPets = await myPetsAll(req, req.query.userId);
    res.json(myPets);
  } else {
    res.status(400).json("Falta la query de userId");
  }
});

app.post("/update-report", async (req, res) => {
  if (req.body.id) {
    const petUpdate = await actualizarMascota(req.body);
    res.json(petUpdate);
  } else {
    res.status(400).json("No hay id de mascota en el body");
  }
});

app.post("/delete-report", async (req, res) => {
  if (req.body.id) {
    const petDeleted = await eliminarPet(req.body.id);
    res.json(petDeleted);
  } else {
    res.status(400).json("No hay id de mascota en el body");
  }
});

app.post("/create-report", async (req, res) => {
  if (req.body.id) {
    const reportCreated = await createReport(req.body, req.body.id);
    res.json(reportCreated);
  } else {
    res.status(400).json("No hay id en el cuerpo del body");
  }
});

app.get("/get-user-pet", async (req, res) => {
  const { id } = req.query;
  try {
    const mascotaAsociada = await Mascota.findOne({
      where: {
        id,
      },
    });
    const userAsociado = await User.findOne({
      where: {
        id: mascotaAsociada.get("userId"),
      },
    });
    res.json(userAsociado);
  } catch (error) {
    res.status(404).json(error);
  }
});

app.post("/send-email", async (req, res) => {
  const { email, nameReport, phoneNumber, moreAboutReport } = req.body;

  const msg = {
    to: email,
    from: "ezequielezequiel9@gmail.com",
    subject: "Hola usuario de PetFinder (Informacion sobre su mascota perdida)",
    text: `Nombre del que reporto: ${nameReport}\nTeléfono del usuario que reporto: ${phoneNumber}\nInformación sobre su mascota: ${moreAboutReport}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send({
      error: "Error al enviar el correo",
      details: error.response.body.errors,
    });
  }
});

const staticDirPath = path.resolve(__dirname, "../fe-dist");

app.use(express.static(staticDirPath));

app.get("*", (req, res) => {
  res.sendFile(staticDirPath + "/index.html");
});

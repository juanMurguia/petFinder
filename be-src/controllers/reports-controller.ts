import { Report } from "../models/";

export const createReport = async (reqBody) => {
  if (!reqBody) {
    console.error("Faltan datos en el body");
  } else {
    const { reportName, phoneNumber, moreAbout } = reqBody;
    // Crear el reporte
    const newReport = await Report.create({
      reportName,
      phoneNumber,
      moreAbout,
    });
    return newReport;
  }
};

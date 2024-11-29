import { Mascota, Report } from "../associations/associations";

export async function createReport(dataReport, id: number) {
  const { reportName, phoneNumber, moreAbout } = dataReport;
  try {
    const pet = await Mascota.findOne({
      where: {
        id,
      },
    });
    const report = await Report.create({
      reportName,
      phoneNumber,
      moreAbout,
      mascotumId: pet.get("id"),
    });
    return report;
  } catch (error) {
    return error;
  }
}

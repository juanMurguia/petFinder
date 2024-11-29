import { initHeader } from "./components/header";
import { initTextComponent } from "./components/text";
import { initButtonComponent } from "./components/button";
import { initButtonReportComponent } from "./components/button-report";

import "./router";
import "./pages/1-home/index";
import "./pages/4-register/index";
import "./pages/3-login/index";
import "./pages/2-auth/index";
import "./pages/5-mis-datos/index";
import "./pages/5-mis-datos/1-modificar-datos/index";
import "./pages/5-mis-datos/2-modificar-contraseña/index";
import "./pages//6-mascotas-perdidas/index";
import "./pages/7-crear-reporte/index";
import "./pages/8-mascota-reportada/index";
import "./pages/8-mascota-reportada/error-al-reportar/index";
import "./pages/9-editar-reporte/index";
import "./pages/9-editar-reporte/report-encontrado/index";
import "./pages/9-editar-reporte/eliminar-report/index";
import "./pages/9-editar-reporte/reporte-editado/index";
import "./pages/10-mis-reports/index";
///
(function main() {
  initHeader();
  initTextComponent();
  initButtonComponent();
  initButtonReportComponent();
})();

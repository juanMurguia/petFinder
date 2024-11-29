import { Router } from "@vaadin/router";
import { initializeApp } from "./state";

window.addEventListener("load", () => {
  const router = new Router(document.querySelector(".root"));

  router.setRoutes([
    { path: "/", component: "mi-inicio" },
    { path: "/register", component: "init-register" },
    { path: "/login", component: "init-login" },
    { path: "/auth", component: "init-auth" },
    { path: "/mis-datos", component: "init-datos" },
    { path: "/editar-data", component: "edit-data" },
    { path: "/editar-password", component: "edit-pass" },
    { path: "/mascotas-perdidas", component: "mascotas-perdidas" },
    { path: "/crear-reporte", component: "create-report" },
    { path: "/mascota-reportada", component: "mascota-reportada" },
    { path: "/error-reporte", component: "error-reporte" },
    { path: "/editar-reporte", component: "edit-report" },
    { path: "/reporte-editado", component: "reporte-editado" },
    { path: "/mascota-encontrada", component: "mascota-encontrada" },
    { path: "/eliminar-reporte", component: "eliminar-report" },
    { path: "/mis-reportes", component: "mis-reportes" },
  ]);
  initializeApp();
});

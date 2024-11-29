import { Router } from "@vaadin/router";
import { state } from "../../../state";

export class DeletedReport extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    //traemos data del state, si no hay data de mascotas cerca de la ubicacion que tenemos el contenedor-card lo ponemos como display.none
    this.innerHTML = `
          <mi-header></mi-header>
          <div class="contenedor-main">
              <div class="contenedor-title">
                  <mi-texto tipoTexto="subtitle">Eliminaste el reporte ✅ ✅ ✅</mi-texto>
              </div>
              <div class="reports">
                <mi-button class="mis-reports button" atributoButton="Ir a mis reportes"></mi-button>
              </div>
              <div class="contenedor-pregunta">
                     <mi-texto tipoTexto="subtitle">Esta seguro de eliminar el reporte?</mi-texto>
              </div>
              <div class="contenedor-button">
                  <mi-button class="eliminar-si" atributoButton="Si"></mi-button>
             </div>
             <div class="contenedor-button">
                <mi-button class="eliminar-no" atributoButton="No"></mi-button>
             </div>
          </div>
  
          <style>
  
              .contenedor-main{
                  display:flex;
                  flex-direction:column;
                  height:100vh;
                  align-items:center;
                  
              }
  
              .contenedor-title{
                  padding: 10% 0;
                  display:none;
              }

              .contenedor-pregunta{
                padding:10% 0 ;
              }

               .my-input, .my-text-area{
                  width:274px;
                  height: 60px;
                  border:none;
                  border-radius:7px;
              }
              
              .caja-input{
                  color:white;
                  padding:25px 0;
                  padding-left: 20px;
              }

              .contenedor-button{
                padding-top:20px;
              }

              .reports{
                display:none;
                padding-top:20px;

              }
  
          </style>
  
          `;
    //
    const contenedorTitle = this.querySelector(
      ".contenedor-title"
    ) as HTMLDivElement;

    const contenedorPregunta = this.querySelector(
      ".contenedor-pregunta"
    ) as HTMLDivElement;

    const contenedorButtonReportes = this.querySelector(
      ".reports"
    ) as HTMLDivElement;

    const contenedorButtons = this.querySelector(
      ".contenedor-button"
    ) as HTMLDivElement;

    const buttonIr = this.querySelector(".mis-reports") as HTMLButtonElement;
    const buttonSi = this.querySelector(".eliminar-si") as HTMLButtonElement;
    const buttonNo = this.querySelector(".eliminar-no") as HTMLButtonElement;

    buttonSi.addEventListener("MiButton", async (e) => {
      e.preventDefault();
      contenedorTitle.style.display = "inherit";
      contenedorButtonReportes.style.display = "inherit";
      buttonSi.style.display = "none";
      buttonNo.style.display = "none";
      contenedorPregunta.style.display = "none";
      state.deleteReport();
    });

    //
    buttonNo.addEventListener("MiButton", (e) => {
      e.preventDefault();
      Router.go("/mis-reportes");
    });
    //
    buttonIr.addEventListener("MiButton", (e) => {
      e.preventDefault();
      Router.go("/mis-reportes");
    });
  }
}

customElements.define("eliminar-report", DeletedReport);

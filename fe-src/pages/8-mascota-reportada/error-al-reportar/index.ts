import { Router } from "@vaadin/router";

export class ErrorReport extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    //traemos data del state, si no hay data de mascotas cerca de la ubicacion que tenemos el contenedor-card lo ponemos como display.none
    this.innerHTML = `
          <mi-header></mi-header>
          <div class="contenedor-main">
              <div class="contenedor-title">
                  <mi-texto tipoTexto="subtitle">Error al reportar mascota❌❌ Intentelo de nuevo</mi-texto>
              </div>
              <div class="contenedor-button">
                <mi-button class="mis-reports" atributoButton="Ir a mascotas cerca"></mi-button>
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
  
          </style>
  
          `;
    //
    const buttonIr = this.querySelector(".mis-reports") as HTMLButtonElement;

    //
    buttonIr.addEventListener("MiButton", (e) => {
      e.preventDefault();
      Router.go("/mascotas-perdidas");
    });
  }
}

customElements.define("error-reporte", ErrorReport);

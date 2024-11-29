import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Editdata extends HTMLElement {
  connectedCallback() {
    const myState = state.getState();
    if (!myState.userId) {
      Router.go("/auth");
    } else {
      this.render();
    }
  }
  render() {
    const currentState = state.getState();
    this.innerHTML = `
      <mi-header></mi-header>
      <div class="contenedor-datos">
          <div class="contenedor-title">
                  <mi-texto tipoTexto="title">Mis datos</mi-texto>
           </div>
  
          <div class="contenedor-button">
                <mi-button class="button-data" atributoButton="Modificar datos"></mi-button>
           </div>
  
           <div class="contenedor-button">
             <mi-button class="button-pass" atributoButton="Modificar contraseña"></mi-button>
            </div>
  
  
          <div class="cuenta">
              <div class="caja-label">
                   <mi-texto tipoTexto="parrafo">${currentState.email}</mi-texto> 
  
              </div>
              <div class="caja-label cerrar-sesion">
                 <label class="label-cuenta">Aún no tenes cuenta? <a class="referencia" href="">Cerrar Sesión.</a> </label>
              </div>
  
          </div>
      </div>
      
      <style>
              .contenedor-datos{
                  display:flex;
                  flex-direction:column;
                  justify-content:center;
                  align-items:center
              }
              .contenedor-title{
                  padding:50px 0;
              }
  
              .cuenta{
                  padding-top:60px;
              }
  
              .caja-label{
                  padding-top:25px;
              }
  
              .cerrar-sesion{
                  padding-bottom: 80px;
              }

              .contenedor-button{
                padding-bottom:25px;
              }
      </style>
  
      `;

    const referenciaSesion = this.querySelector(".referencia");
    referenciaSesion?.addEventListener("click", (e) => {
      currentState.email = "";
      currentState.userId = "";
      currentState.localidad = "";
      currentState.password = "";
      state.setState(currentState);
      Router.go("/");
    });

    const buttonEditData = this.querySelector(
      ".button-data"
    ) as HTMLButtonElement;

    buttonEditData.addEventListener("MiButton", (e) => {
      e.preventDefault();
      Router.go("/editar-data");
    });

    const buttonEditPassword = this.querySelector(
      ".button-pass"
    ) as HTMLButtonElement;

    buttonEditPassword.addEventListener("MiButton", (e) => {
      e.preventDefault();
      Router.go("/editar-password");
    });
  }
}

customElements.define("init-datos", Editdata);

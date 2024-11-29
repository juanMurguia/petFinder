import { Router } from "@vaadin/router";
import { state } from "../../../state";

export class Editpass extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
      <mi-header></mi-header>
      <form class="contenedor-home">
          <div class="contenedor-title">
             <mi-texto tipoTexto="title">Contraseña</mi-texto>
          </div>
  
  
          <div class="contenedor-inputs">
              <div class="caja-input">
                  <mi-texto tipoTexto="parrafo">CONTRASEÑA</mi-texto>
                  <input type="password" class="my-input my-password" type="text">
              </div>
              <div class="caja-input">
                  <mi-texto tipoTexto="parrafo">CONFIRMAR CONTRASEÑA</mi-texto>
                  <input type="password" class="my-input my-password-confirm" type="text">
              </div>
          </div>
  
  
          <div class="contenedor-button">
                <mi-button class="button-guardar" atributoButton="Guardar"></mi-button>
                <div class="inputs-vacios"> <mi-texto tipoTexto="parrafo">No dejes campos sin completar</mi-texto>  </div>
                <div class="guardado"> <mi-texto tipoTexto="parrafo">Contraseña guardada ✅</mi-texto>  </div>
           </div>
  
      </form>
        
        <style>
                .contenedor-home{
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    align-items:center
                }
  
                .contenedor-title{
                  padding: 50px 0;
              }
  
                .contenedor-inputs{
                  display:flex;
                  flex-direction:column;
                  justify-content:center;
               }
  
              .caja-input{
                  padding:25px 0;
              }
  
              .my-input{
                  width:335px;
                  height: 60px;
                  border:none;
                  border-radius:7px;
              }
  
              .contenedor-button{
                  padding:40px 0;
              }

              .inputs-vacios{
                display:none;
                color:red;
                padding:30px 0;
              }

              .guardado{
                display:none;
                color:green;
                padding:30px 0;
              }
              
        </style>
    
        `;
    const inputPassword = this.querySelector(
      ".my-password"
    ) as HTMLInputElement;
    //
    const inputConfirmPassword = this.querySelector(
      ".my-password-confirm"
    ) as HTMLInputElement;

    const buttonGuardar = this.querySelector(
      ".button-guardar"
    ) as HTMLButtonElement;
    buttonGuardar.addEventListener("MiButton", async (e) => {
      e.preventDefault();
      if (inputPassword.value && inputConfirmPassword.value !== "") {
        const currentState = state.getState();
        currentState.updatePassword = inputPassword.value;
        await state.updatePassword();
        const newState = state.getState();
        if (newState.update[0] === 1) {
          const divGuardado = this.querySelector(".guardado") as HTMLDivElement;
          divGuardado.style.display = "inherit";
          inputPassword.value = "";
          inputConfirmPassword.value = "";
          setTimeout(() => {
            Router.go("/mis-datos");
          }, 4000);
        }
      } else {
        const divInputs = this.querySelector(
          ".inputs-vacios"
        ) as HTMLDivElement;
        divInputs.style.display = "inherit";
      }
    });
  }
}

customElements.define("edit-pass", Editpass);

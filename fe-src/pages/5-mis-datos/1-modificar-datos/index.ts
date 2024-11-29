import { Router } from "@vaadin/router";
import { state } from "../../../state";

export class Edit extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <mi-header></mi-header>
    <form class="contenedor-home">
        <div class="contenedor-title">
           <mi-texto tipoTexto="title">Datos personales</mi-texto>
        </div>


        <div class="contenedor-inputs">
            <div class="caja-input">
                <mi-texto tipoTexto="parrafo">NOMBRE</mi-texto>
                <input class="my-input my-input-name" type="text">
            </div>
            <div class="caja-input">
                <mi-texto tipoTexto="parrafo">LOCALIDAD (ciudad y provincia)</mi-texto>
                <input class="my-input my-input-localidad" type="text">
            </div>
        </div>


        <div class="contenedor-button">
              <mi-button class="button-guardar" atributoButton="Guardar"></mi-button>
         </div>
        <div class="inputs-vacios"><mi-texto tipoTexto="parrafo">Por favor no dejes campos sin completar</mi-texto></div>
        <div class="guardado"><mi-texto tipoTexto="parrafo">Datos guardados ✅ <br>Redirigiendo a mascotas cercas...</mi-texto></div>

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
              padding-bottom:25px;
            }
            
            .guardado{
              display:none;
              color:green;
              padding-bottom:30px;
            }

      </style>
  
      `;
    const buttonGuardar = this.querySelector(
      ".button-guardar"
    ) as HTMLButtonElement;
    //
    const myInputName = this.querySelector(
      ".my-input-name"
    ) as HTMLInputElement;
    //
    const myInputLocalidad = this.querySelector(
      ".my-input-localidad"
    ) as HTMLInputElement;
    buttonGuardar.addEventListener("MiButton", async (e) => {
      e.preventDefault();
      if (myInputName.value && myInputLocalidad.value !== "") {
        const currentState = state.getState();
        currentState.fullName = myInputName.value;
        currentState.localidad = myInputLocalidad.value;
        state.setState(currentState);
        await state.setLongLatUser(currentState.localidad);
        await state.agregarDatos();
        const newState = state.getState();
        if (newState.update[0] === 1) {
          const divGuardado = this.querySelector(".guardado") as HTMLDivElement;
          divGuardado.style.display = "inherit";
          setTimeout(() => {
            Router.go("/mascotas-perdidas");
          }, 4000);
        }
      } else {
        const inputVacio = this.querySelector(
          ".inputs-vacios"
        ) as HTMLDivElement;
        inputVacio.style.display = "inherit";
      }
    });
  }
}

customElements.define("edit-data", Edit);

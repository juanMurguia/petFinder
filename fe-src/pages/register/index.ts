import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Register extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
      <mi-header></mi-header>
      <form class="contenedor-home">
          <div class="contenedor-title">
             <mi-texto tipoTexto="title">Registrarse</mi-texto>
          </div>
          <div class="contenedor-subtitle">
              <mi-texto tipoTexto="subtitle">Ingresá los siguientes datos para realizar el registro</mi-texto>
          </div>
          <div class="contenedor-inputs">
            <div class="caja-input">
                <mi-texto tipoTexto="parrafo">EMAIL</mi-texto>
                <input class="my-input my-email" type="text">
                <div class="email-registrado"><mi-texto tipoTexto="parrafo">Este email ya esta registrado</mi-texto></div>

            </div>

            <div class="caja-input">
                <mi-texto tipoTexto="parrafo">CONTRASEÑA</mi-texto>
                <input class="my-input my-password" type="password">
            </div>

            <div class="caja-input">
                <mi-texto tipoTexto="parrafo">CONFIRMAR CONTRASEÑA</mi-texto>
                <input class="my-input my-password-confirm" type="password">
                <div class="password-incorrecto"><mi-texto tipoTexto="parrafo">Las contraseñas no coinciden, vuelve a introducirlas</mi-texto></div>
            </div>

          </div>
          <div class="cuenta">
              <label class="label-cuenta">Ya tenes una cuenta? <a class="referencia" href="/login">Inicia Sesion</a> </label>
          </div>

          <div class="contenedor-button">
                 <mi-button class="button-login" atributoButton="Registrarse"></mi-button>
          </div>

      </form>

      <style>
            .contenedor-home{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
            }

            .contenedor-title{
                padding:50px 0;
            }

            .contenedor-subtitle{
                text-align:center;
                padding-bottom:25px;
            }

            .contenedor-inputs{
                display:flex;
                flex-direction:column;
                justify-content:center;
            }

            .my-input{
                width:335px;
                height:60px;
                border:none;
                border-radius:7px;
            }

            .caja-input{
                padding:25px 0;
            }
            
            .referencia{
                color:#5A8FEC;
                text-decoration: none;
            }

            .contenedor-button{
                padding:20px 0;
            }

            .password-incorrecto{
                display:none;
                color:red;
            }

            .email-registrado{
                display:none;
                color:red;
            }

      </style>
          `;

    const myButton = this.querySelector(".button-login") as HTMLButtonElement;
    const inputEmail = this.querySelector(".my-email") as HTMLInputElement;
    const inputPassword = this.querySelector(
      ".my-password"
    ) as HTMLInputElement;
    //
    const inputConfirm = this.querySelector(
      ".my-password-confirm"
    ) as HTMLInputElement;

    myButton.addEventListener("MiButton", async (e) => {
      e.preventDefault();
      const currentState = state.getState();
      currentState.email = inputEmail.value;
      currentState.fullName = "";
      currentState.localidad = "";
      currentState.password = inputPassword.value;
      await state.verifyEmail();
      const newState = state.getState();
      console.log(newState.email);
      console.log(newState.verificarEmail);
      if (currentState.email !== currentState.verificarEmail) {
        if (inputPassword.value === inputConfirm.value) {
          state.setState(currentState);
          await state.signUp();
          Router.go("/mis-datos");
        } else {
          const passwordIncorrecto = this.querySelector(
            ".password-incorrecto"
          ) as HTMLDivElement;
          passwordIncorrecto.style.display = "inherit";
        }
      } else {
        const emailYaRegistrado = this.querySelector(
          ".email-registrado"
        ) as HTMLDivElement;
        emailYaRegistrado.style.display = "inherit";
      }
    });
  }
}

customElements.define("init-register", Register);

import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Login extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
        <mi-header></mi-header>
        <form class="contenedor-home">
            <div class="contenedor-title">
               <mi-texto tipoTexto="title">Iniciar Sesión</mi-texto>
            </div>
            <div class="contenedor-subtitle">
                <mi-texto tipoTexto="subtitle">Ingresá los siguientes datos para iniciar sesión</mi-texto>
            </div>

            <div class="contenedor-inputs">
                <div class="caja-input">
                    <mi-texto tipoTexto="parrafo">EMAIL</mi-texto>
                    <input class="my-input my-email" type="email" autocomplete="on">
                </div>
                <div class="caja-input">
                    <mi-texto tipoTexto="parrafo">CONTRASEÑA</mi-texto>
                    <input class="my-input my-password" type="password">
                </div>
            </div>

            <div class="cuenta">
                  <a class="referencia" href="/auth"><mi-texto tipoTexto="parrafo">Olvide mi contraseña</mi-texto></a>
            </div>
            <div class="contenedor-button">
                  <mi-button class="button-login" atributoButton="Acceder"></mi-button>
                  <div class="datos-incorrectos"><mi-texto tipoTexto="parrafo">Datos incorrectos, verifica los datos ingresados</mi-texto></div>
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
                padding: 50px 0;
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

            .caja-input{
                padding:25px 0;
            }

            .my-input{
                width:335px;
                height: 60px;
                border:none;
                border-radius:7px;
            }

            .referencia{
                color:#5A8FEC;
                text-decoration: none;

            }

            .contenedor-button{
                padding:20px 0;
            }

            .datos-incorrectos{
                display:none;
                color:red;
            }
            
        </style>
            `;
    const emailUser = this.querySelector(".my-email") as HTMLInputElement;
    const passwordUser = this.querySelector(".my-password") as HTMLInputElement;
    const buttonLogin = this.querySelector(
      ".button-login"
    ) as HTMLButtonElement;
    //
    const divDatosIncorrectos = this.querySelector(
      ".datos-incorrectos"
    ) as HTMLDivElement;
    //
    buttonLogin.addEventListener("MiButton", async (e) => {
      e.preventDefault();
      if (emailUser.value !== "" && passwordUser.value !== "") {
        const currentState = state.getState();
        currentState.email = emailUser.value;
        currentState.password = passwordUser.value;
        state.setState(currentState);
        await state.autenticar();
        await state.signIn();
        if (typeof currentState.userId === "number") {
          Router.go("/mascotas-perdidas");
        } else {
          divDatosIncorrectos.style.display = "inherit";
        }
      }
    });
  }
}

customElements.define("init-login", Login);

import { Router } from "@vaadin/router";

export class Home extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <mi-header></mi-header>
    <div class="contenedor-home">
        <div class="contenedor-title">
           <mi-texto tipoTexto="title">Pet Finder App</mi-texto>
        </div>
        <div class="contenedor-subtitle">
            <mi-texto tipoTexto="subtitle">Encontrá y reportá mascotas perdidas cerca de tu ubicación</mi-texto>
        </div>
        <div class="contenedor-button">
        <div class="caja-button">
             <mi-button class="button-register" atributoButton="Registrarse"></mi-button>
        </div>
        <div class="caja-button">
        <mi-button class="button-login" atributoButton="Iniciar Sesion"></mi-button>
        </div>

        </div>
    </div>

    <style>
      .contenedor-home{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
      }

      .contenedor-img{
         padding:25px 0;
      }

      .contenedor-title{
        padding:25px 0;
      }

      .contenedor-subtitle{
        text-align:center;
      }

      .contenedor-button{
        padding: 30px 0;
      }

      .caja-button{
        padding-top:20px;
      }
    </style>
        `;

    const buttonRegister = this.querySelector(".button-register");
    const buttonLogin = this.querySelector(".button-login");
    buttonRegister?.addEventListener("MiButton", (e) => {
      e.preventDefault();
      Router.go("/register");
    });

    buttonLogin?.addEventListener("MiButton", (e) => {
      e.preventDefault();
      Router.go("/login");
    });
  }
}

customElements.define("mi-inicio", Home);

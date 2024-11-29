import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Auth extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
          <mi-header></mi-header>
          <form class="contenedor-home">
              <div class="contenedor-img">
                   <img src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1714073161/pet-finder/auth/rhktwf3s1vy6e4rjzv8p.svg" alt="ingresar">
              </div>
              <div class="contenedor-title">
                      <mi-texto tipoTexto="title">Ingresar</mi-texto>
               </div>
              <div class="contenedor-subtitle">
                  <mi-texto tipoTexto="subtitle">Ingresá tu email para continuar.</mi-texto>
              </div>
  
              <div class="contenedor-inputs">
                  <div class="caja-input">
                      <mi-texto tipoTexto="parrafo">EMAIL</mi-texto>
                      <input class="my-input" type="text">
                  </div>
              </div>
  
              <div class="cuenta">
                    <label class="label-cuenta">Aún no tenes cuenta? <a class="referencia" href="/register">Registrate.</a> </label>
              </div>
              <div class="contenedor-button">
                    <button class="button-login" atributoButton="Siguiente"><mi-texto tipoTexto="parrafo">Ingresar</mi-texto></button>
                    <div class="notFound"><mi-texto tipoTexto="parrafo">Su email ingresado no esta registrado, por favor ingrese donde dice "Registrate"</mi-texto></div>
               </div>
  
          </form>
  
  
          <style>

                .contenedor-img{
                    padding:25px 0;
                }

              .contenedor-home{
                  display:flex;
                  flex-direction:column;
                  justify-content:center;
                  align-items:center;
              }
              .contenedor-title{
                  padding-bottom: 50px;
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
                display:flex;
                flex-direction:column;
                align-items: center;
                padding:20px 0;
              }

              .button-login{
                background-color:#006CFC;
                width:335px;
                height:50px;
                border:none;
                border-radius: 5px;
    
                color:white; 
                cursor: pointer;
                transition: transform 0.2s;
              }

              .notFound{
                display:none;
                color:red;
                text-align:center;
                padding:15px 0;
              }
              
          </style>
              `;
    const buttonLogin = this.querySelector(
      ".button-login"
    ) as HTMLButtonElement;
    const myInputEmail = this.querySelector(".my-input") as HTMLInputElement;
    const divError = this.querySelector(".notFound") as HTMLDivElement;

    buttonLogin.addEventListener("click", async (e) => {
      e.preventDefault();
      const emailValue = myInputEmail.value;
      if (emailValue.trim() !== "") {
        const currentState = state.getState();
        currentState.email = emailValue;
        state.setState(currentState);
        await state.verifyEmail();
        const newState = state.getState();
        if (newState.email === newState.verificarEmail) {
          Router.go("/login");
        } else {
          divError.style.display = "inherit";
        }
      }
    });
  }
}

customElements.define("init-auth", Auth);

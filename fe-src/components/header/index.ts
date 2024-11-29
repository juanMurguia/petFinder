import { Router } from "@vaadin/router";
import { state } from "../../state";

export function initHeader() {
  customElements.define(
    "mi-header",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const currentState = state.getState();
        const shadow = this.attachShadow({ mode: "open" });
        //
        const link = document.createElement("link");
        link.setAttribute(
          "href",
          "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        );
        link.setAttribute("rel", "stylesheet");
        shadow.appendChild(link);
        //
        const divContainerHeader = document.createElement("div");
        const divMenu = document.createElement("div");
        divContainerHeader.innerHTML = `
        <div class="container-img">
             <img src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1713836409/pet-finder/rwo0kjz6nuhaxzwacx4h.png" alt="logo">
        </div>
        `;

        divMenu.innerHTML = `
        <div class="header_menu">
           <img class="menu" src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1713902741/pet-finder/aklfxmmd9ppfhfc9stwb.png" alt="menu" />
        </div>
          <div class="container_links">
            <button type="submit" class="cerrar">✖️</button>
            <a class="enlaces" href="/mis-datos">Mis Datos</a>
            <a class="enlaces" href="/mis-reportes">Mis mascotas reportadas</a>
            <a class="enlaces" href="/crear-reporte">Crear reporte</a>
            <a class="enlaces" href="/mascotas-perdidas">Mascotas perdidas cerca</a>
            <div class="email-cerrar-sesion">
               <a class="enlaces enlace-email" href="">${currentState.email}</a>
               <a class="cerrar-sesion" href="">Cerrar Sesión</a>
            </div>
          </div>
        `;
        divContainerHeader.className = "header";
        divContainerHeader.appendChild(divMenu); // Agregar divMenu como hijo de divContainerHeader
        shadow.appendChild(divContainerHeader);
        //
        const enlaces = shadow.querySelectorAll(".enlaces");
        const menu = shadow.querySelector(".menu");
        const logoContainer = shadow.querySelector(
          ".container-img"
        ) as HTMLDivElement;
        logoContainer.addEventListener("click", (e) => {
          e.preventDefault();
          Router.go("/");
        });
        //
        const buttonVolver = shadow.querySelector(
          ".cerrar"
        ) as HTMLButtonElement;

        const cerrarSession = shadow.querySelector(".cerrar-sesion");
        cerrarSession?.addEventListener("click", () => {
          const currentState = state.getState();
          for (const key in currentState) {
            if (currentState.hasOwnProperty(key)) {
              currentState[key] = "";
            }
          }
          state.setState(currentState);
          state.cerrarSession();
          Router.go("/");
        });

        const imgMenu = shadow.querySelector(
          ".container_links"
        ) as HTMLDivElement;
        //
        const divEnlaces = shadow.querySelector(
          ".email-cerrar-sesion"
        ) as HTMLDivElement;
        //
        menu?.addEventListener("click", () => {
          imgMenu.style.display = "flex";
          imgMenu.style.flexDirection = "column";
          imgMenu.style.justifyContent = "center";
          imgMenu.style.alignItems = "center";
          imgMenu.style.backgroundColor = "#26302E";
          imgMenu.style.position = "absolute";
          imgMenu.style.zIndex = "2";
          imgMenu.style.top = "0";
          imgMenu.style.left = "0";
          imgMenu.style.right = "0";

          divEnlaces.style.display = "flex";
          divEnlaces.style.flexDirection = "column";
          divEnlaces.style.justifyContent = "center";
          divEnlaces.style.alignItems = "center";
          divEnlaces.style.paddingBottom = "15px";
          console.log("se hizo click evento menu ");
        });
        //

        enlaces.forEach((e) => {
          e.addEventListener("click", () => {
            imgMenu.style.display = "none";
            divEnlaces.style.display = "none";
          });
        });
        buttonVolver.addEventListener("click", () => {
          imgMenu.style.display = "none";
          divEnlaces.style.display = "none";
        });

        const style = document.createElement("style");
        style.textContent = `
            .header{
                display: flex;
                justify-content: space-between;
                background-color: #26302E;
                height:60px;
                padding: 20px 0;
            }
            .container-img{
              padding-left:35px;
              cursor:pointer;
            }

            .imagen {
                background-size: contain; 
                background-repeat: no-repeat;
                width: 70px;
                height: 70px;
              }
              
            .container_links, .email-cerrar-sesion{
              display:none;

            }

            .cerrar{
              color:white;
              font-size:20px;
              margin:35px 0;

            }

            .enlaces{
              font-size:24px;
              text-decoration:none;
              margin-bottom:0px;
              color:white;
              padding-bottom:50px;
              font-family: "Poppins", sans-serif;

            }

            .enlace-email{
              font-size:25px;
              color:#6E7AFA

            } 

            .cerrar-sesion{
              font-size:18px;
              color:#3B97D3;
              font-family: "Poppins", sans-serif;

            }

            .header_menu{
              padding-right:30px;
            }

        `;
        shadow.appendChild(style);
      }
    }
  );
}

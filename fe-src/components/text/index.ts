export function initTextComponent() {
  customElements.define(
    "mi-texto",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const link = document.createElement("link");
        link.setAttribute(
          "href",
          "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        );
        link.setAttribute("rel", "stylesheet");
        shadow.appendChild(link);
        //
        const atributo = this.getAttribute("tipoTexto") || "";
        const divContainerTexto = document.createElement("div");
        divContainerTexto.className = atributo;
        //Aca no creamos un innerHTML sino que le asignamos lo que contenga el custom element <tipoTexto>Titulo<tipoTexto> a nuestro div
        divContainerTexto.textContent = this.textContent;
        shadow.appendChild(divContainerTexto);
        //
        //Style
        //
        const style = document.createElement("style");
        style.textContent = `
            .title{
                font-size:36px;
                font-weight: 400;
                font-family: "Poppins", sans-serif;
                font-style: normal;
                text-align:center;

            }

            .subtitle{
                font-size:24px;
                font-weight: 700;
                font-family: "Poppins", sans-serif;
                font-style: normal;
                text-align:center;

            }

            .parrafo{
                font-size:16px;
                font-weight: 400;
                font-family: "Poppins", sans-serif;
                font-style: normal;

            }

            .label{
              font-size:12px;
              font-weight: 400;
              font-family: "Poppins", sans-serif;
              font-style: normal;
              text-align:center;

          }

        `;
        shadow.appendChild(style);
      }
    }
  );
}

export function initButtonReportComponent() {
  customElements.define(
    "button-report",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const textoDelButton = this.getAttribute("atributoButton");
        const divContainer = document.createElement("div");
        divContainer.className = "contenedor-button";
        divContainer.innerHTML = `
              <button type="submit" class="mi-button">
                  <mi-texto tipoTexto="parrafo">${textoDelButton}</mi-texto>
              </button>
          `;

        divContainer.addEventListener("click", () => {
          this.dispatchEvent(new CustomEvent("MiButtonReport"));
          console.log("se hizo click evento button ");
        });
        shadow.appendChild(divContainer);
        //
        //
        const style = document.createElement("style");
        style.textContent = `
  
          .contenedor-button{
           }
             .mi-button{
                box-shadow: 0px 1px 4px 0px #00000040;
                background-color:#FF795C;
                 width:120px;
                 height:40px;
                 border:none;
                 border-radius: 5px;
                 color:white; 
                 cursor: pointer;
                 transition: transform 0.2s;
             }
             
             .mi-button:active {
                 transform: scale(0.95);
               }
  
          `;
        shadow.appendChild(style);
      }
    }
  );
}

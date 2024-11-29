export function initButtonComponent() {
  customElements.define(
    "mi-button",
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
          this.dispatchEvent(new CustomEvent("MiButton"));
          console.log("se hizo click evento button ");
        });
        shadow.appendChild(divContainer);
        //
        //
        const style = document.createElement("style");
        style.textContent = `

        .contenedor-button{
            display:flex;
            align-items:center;
            justify-content:center;
         }
           .mi-button{
               background-color:#006CFC;
               width:335px;
               height:50px;
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

import { Router } from "@vaadin/router";
import { state } from "../../state";

export class MisReports extends HTMLElement {
  connectedCallback() {
    const myState = state.getState();
    if (!myState.userId) {
      Router.go("/auth");
    } else {
      this.render();
    }
  }

  async render() {
    await state.myPetsReportadas();
    const currentState = state.getState();
    const arrayPet = currentState.dataPet;
    let content = "";

    if (arrayPet) {
      arrayPet.forEach((pet) => {
        content += `
                <div class="contenedor-card">
                    <div class="contenedor-img">
                        <img class="img-dog" src="${pet.petImageUrl}" alt="chester">
                    </div>

                    <div class="contenedor-info">
                        <div class="title-dog">
                            <mi-texto tipoTexto="subtitle">${pet.namePet}</mi-texto>
                            <mi-texto tipoTexto="parrafo">${pet.petUbicacion}</mi-texto>
                        </div>
                        <div class="contenedor-id">
                            <mi-texto tipoTexto="parrafo">${pet.id}</mi-texto>
                        </div>
                        <div class="contenedor-button">
                            <button name="button" class="button-editar">Editar</button>
                        </div>
                    </div>
                </div>
            `;
      });
    } else {
      content = `
            <div class="sin-reportes">
                <div class="contenedor-title">
                    <mi-texto tipoTexto="subtitle">Aún no reportaste mascotas perdidas</mi-texto>
                </div>
                <div class="contenedor-img-reports">
                    <img src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1714510371/pet-finder/reports/btgol39wfj7mqzqsxzak.svg" alt="">
                </div>
            </div>`;
    }
    this.innerHTML = `
        <mi-header></mi-header>
        <div class="contenedor-main">
            <div class="contenedor-title">
                <mi-texto tipoTexto="title">Mascotas reportadas..</mi-texto>
            </div>
            ${content}
        </div>
                
      <style>

      .contenedor-main{
          display:flex;
          flex-direction:column;
          height:100vh;
          align-items:center;
      }

      .contenedor-title{
          padding: 30px 0;
      }

      .contenedor-card{
          display: flex;
          flex-direction:column;
          justify-content: center;
          align-items: center;
          box-shadow: 0px 1px 4px 0px #00000040;
          border-radius:10px;
          background-color:#26302E;
          position: relative;
          z-index: 1; 
          margin: 30px 0;
          width:294px;
          height:350px;
      }
      
      
      .contenedor-id{
          display: none;
      }

      .contenedor-img{
          padding-top:5px;
      }
      
      .img-dog{
          width:248px;
          border-radius:13px;
          max-width: 100%; 
          height: 203px;
      }
      .contenedor-info{
          margin:0 15px;
      }

      .title-dog{
          color:white;
          padding:0 5px;
          text-align:center;
      }

      .formulario-info{
          display:none;
          border-radius:10px;
          position: absolute;
          
      }

      .contenedor-title-cerrar{
          display:flex;
      }

      .cerrar-form{
          padding:15px 10px;
      }

      .contenedor-title-form{
          text-align:center;
          color:white;
      }

      .contenedor-info{
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          padding: 15px 10px;
       }

       .contenedor-button{
          margin:10px 5px;
          display: flex;
          
       }

       .button-editar{
          box-shadow: 0px 1px 4px 0px #00000040;
          background-color:#6E7AFA;
           width:120px;
           height:40px;
           border:none;
           border-radius: 5px;
           color:white; 
           cursor: pointer;
           transition: transform 0.2s;

       }

       button-editar:active{
          transform: scale(0.95);
       }

       .button-guardar{
          background-color:#4881F4;
           width:120px;
           height:40px;
           border:none;
           border-radius: 5px;
           color:white; 
           cursor: pointer;
           transition: transform 0.2s;
           margin: 0px 6px;
       }

       button-guardar:active{
          transform: scale(0.95);
       }


       .button-encontrado{
          background-color:#48F448;
           width:120px;
           height:40px;
           border:none;
           border-radius: 5px;
           color:white; 
           cursor: pointer;
           transition: transform 0.2s;
           margin:12px 0;
           margin: 0px 6px;
       }

       button-encontrado:active{
          transform: scale(0.95);
       }

       .my-input, .my-text-area{
          width:274px;
          height: 60px;
          border:none;
          border-radius:7px;
      }
      
      .caja-input{
          color:white;
          padding:25px 0;
          padding-left: 20px;
      }
      
      .sin-reportes{
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          margin:25px 0;
      }

       .contenedor-img-pet-found{
              margin:20px 0;
          }

      .img-found{
          width:45px;
          height:45px;
      }

      .button-informacion{
          width:335px;
          height:50px;
          border:none;
          border-radius: 5px;
          color:white; 
          cursor: pointer;
          transition: transform 0.2s;
      }

      .button-informacion:active{
          transform: scale(0.95);

      }

  </style>
  
    `;

    const buttonsEdit = this.querySelectorAll(".button-editar");
    buttonsEdit.forEach((button) => {
      button.addEventListener("click", (e) => {
        const currentState = state.getState();
        const card = button.closest(".contenedor-card");
        if (!card) return;

        const namePetElement = card.querySelector(
          '.title-dog mi-texto[tipoTexto="subtitle"]'
        );
        const namePet = namePetElement?.textContent ?? "desconocido";

        const idElement = card.querySelector(
          '.contenedor-id mi-texto[tipoTexto="parrafo"]'
        );
        const id = idElement?.textContent ?? "0"; // Si idElement o textContent es null, usar "0"

        const numId = Number(id);
        currentState.petName = namePet;
        currentState.idPet = numId;
        state.setState(currentState);
        Router.go("/editar-reporte");
      });
    });

    const sinReportsContainer = this.querySelector(
      ".sin-reportes"
    ) as HTMLDivElement;

    const contenedorMascotas = this.querySelector(
      ".contenedor-main"
    ) as HTMLDivElement;
  }
}

customElements.define("mis-reportes", MisReports);

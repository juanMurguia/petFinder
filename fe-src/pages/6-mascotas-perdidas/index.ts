import { Router } from "@vaadin/router";
import { state } from "../../state";

export class MascotasPerdidas extends HTMLElement {
  connectedCallback() {
    const myState = state.getState();
    if (!myState.userId) {
      Router.go("/auth");
    } else {
      this.render();
    }
  }
  async render() {
    const currentState = state.getState();

    await state.mascotasCerca();
    const arrayPet = currentState.dataPet;

    //traemos data del state, si no hay data de mascotas cerca de la ubicacion que tenemos el contenedor-card lo ponemos como display.none
    this.innerHTML = `
    <mi-header></mi-header>
    <div class="contenedor-main">
        <div class="contenedor-title">
            <mi-texto tipoTexto="title">Mascotas perdidas cerca..</mi-texto>
        </div>
        ${
          arrayPet.length > 0
            ? arrayPet
                .map(
                  (pet) => `
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
                          <mi-texto tipoTexto="parrafo">${pet.objectID}</mi-texto>
                        </div>
                        <div class="contenedor-button">
                        <button name="button" class="button-reportar">Reportar</button>
                        </div>
                    </div>
                </div>
                <form class="formulario-info">
                    <div class="contenedor-inputs">
                        <div class="cerrar-form">
                            <button class="cerrar">✖</button>
                        </div>
                        <div class="contenedor-title-form">
                        <mi-texto tipoTexto="subtitle">Reportar info de ${pet.namePet}</mi-texto>
                        </div>
                        <div class="caja-input">
                            <mi-texto tipoTexto="parrafo">NOMBRE</mi-texto>
                            <input class="my-input" type="text" name="name">
                        </div>
                        <div class="caja-input">
                            <mi-texto tipoTexto="parrafo">TELEFONO</mi-texto>
                            <input class="my-input" type="text" name="phone">
                        </div>
                        <div class="caja-input">
                            <mi-texto tipoTexto="parrafo">¿DONDE LO VISTE?</mi-texto>
                            <textarea class="my-text-area" name="location" id="" cols="30" rows="10"></textarea>
                        </div>

                        <div class="contenedor-button">
                        <button name="button" class="button-informacion">Enviar Información</button>
                        </div>
                  </div>    
                </form>
            `
                )
                .join("")
            : `
            <div class="sin-mascotas">
                <mi-texto tipoTexto="subtitle">Aún no hay mascotas cerca de tu ubicación</mi-texto>
                <div class="contenedor-img-pet-found">
                    <img class="img-found" src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1713836409/pet-finder/rwo0kjz6nuhaxzwacx4h.png">
                </div>
            </div>`
        }
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

            .contenedor-img{
                padding-top:5px;
            }
            
            .contenedor-id{
              display:none
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
                background-color:#26302E;
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
                padding:25px 0;
                color:white;
            }

            .contenedor-info{
                display:flex;
                justify-content: space-around;
                padding: 15px 10px;
             }

             .contenedor-button{
                margin:10px 5px;
             }

             .button-reportar{
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

             button-reportar:active{
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
            
            .sin-mascotas{
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
                background-color:#006CFC;
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
    //
    const reportButtons = this.querySelectorAll(".button-reportar");
    //
    reportButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const card = button.closest(".contenedor-card");
        if (!card) return;
        const form = card.nextElementSibling as HTMLFormElement;
        form.style.display = "inherit";
        form.style.zIndex = "2";

        const petNameElement = card.querySelector(
          '.title-dog mi-texto[tipoTexto="subtitle"]'
        );
        const petName = petNameElement?.textContent ?? "desconocido"; // Si petNameElement o textContent es null, usar "desconocido"

        const formTitleElement = form.querySelector(
          ".contenedor-title-form mi-texto"
        );
        if (formTitleElement) {
          formTitleElement.textContent = `Reportar info de ${petName}`;
        }

        const petIdElement = card.querySelector(
          '.contenedor-id mi-texto[tipoTexto="parrafo"]'
        );
        const petId = petIdElement?.textContent ?? "0"; // Si petIdElement o textContent es null, usar "0"
        const id = Number(petId);

        const currentState = state.getState();
        currentState.idPet = id;
        state.setState(currentState);

        await state.getUserPet();
        form.scrollIntoView({ behavior: "smooth" });
      });
    });

    this.querySelectorAll(".cerrar").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const form = button.closest(".formulario-info") as HTMLFormElement;
        form.style.display = "none";
      });
    });
    let emailSend = false;
    this.querySelectorAll(".formulario-info").forEach((formInfo) => {
      const form = formInfo as HTMLFormElement; // Type assertion
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = form.querySelector(
          '.caja-input input[name="name"]'
        ) as HTMLInputElement;

        const phone = form.querySelector(
          '.caja-input input[name="phone"]'
        ) as HTMLInputElement;

        const moreAbout = form.querySelector(
          '.caja-input textarea[name="location"]'
        ) as HTMLTextAreaElement;
        const reportName = name.value;
        const reportPhone = phone.value;
        const reportMoreAbout = moreAbout.value;

        const currentState = state.getState();
        currentState.nameReport = reportName;
        currentState.phoneReport = reportPhone;
        currentState.moreAboutReport = reportMoreAbout;
        state.setState(currentState);
        form.style.display = "none";
        await state.createReport();
        try {
          await state.sendEmailData();
          emailSend = true;
          Router.go("/mascota-reportada");
        } catch (error) {
          console.log("Error al enviar el reporte", error);
          emailSend = false;
        }
        if (emailSend === false) {
          Router.go("/error-reporte");
        } else {
        }
      });
    });
    const contenedorSinMascotas = this.querySelector(
      ".sin-mascotas"
    ) as HTMLDivElement;
    ///
    const contenedorMascotas = this.querySelector(
      ".contenedor-main"
    ) as HTMLDivElement;

    if (arrayPet.length > 0) {
      if (contenedorSinMascotas) {
        contenedorSinMascotas.style.display = "none";
      }
      contenedorMascotas.style.display = "flex";
    }
  }
}

customElements.define("mascotas-perdidas", MascotasPerdidas);

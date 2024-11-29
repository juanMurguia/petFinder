import { Router } from "@vaadin/router";
import Dropzone from "dropzone";
import mapboxgl from "mapbox-gl";
import { state } from "../../state";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
// Crea una instancia del cliente de Mapbox con tu token

mapboxgl.access_token = MAPBOX_TOKEN;

let map;

export class createReport extends HTMLElement {
  connectedCallback() {
    const myState = state.getState();
    if (!myState.userId) {
      Router.go("/auth");
    } else {
      this.render();
    }
  }
  render() {
    this.innerHTML = `
        <mi-header></mi-header>
        <div class="contenedor-home">
            <div class="contenedor-title">
               <mi-texto tipoTexto="title">Reportar mascota</mi-texto>
            </div>
            <div class="contenedor-subtitle">
                <mi-texto tipoTexto="subtitle">Ingresá la siguiente información para realizar el reporte de la mascota</mi-texto>
            </div>

            <div class="contenedor-inputs">
                <div class="caja-input">
                    <div>
                      <mi-texto tipoTexto="parrafo">Nombre de la mascota</mi-texto>
                      <input class="my-input input-pet" type="text">
                    </div>
                    
                    <div class="contenedor-dropzone">
                        <mi-texto tipoTexto="parrafo">Adjuntar foto</mi-texto>
                        <img class="dropzone" src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1715798301/pet-finder/reports/gdiqwa4ttphpeuaarxzw.png" alt="">
                    </div>

                </div>

                <div class="caja-input caja-input-ubi">  

                    <form class="search-form">
                      <mi-texto tipoTexto="parrafo">1-Buscar por ubicación (Ciudad, Provincia)</mi-texto>
                      <input class="my-input q" name="q" type="search">
                      <button class="buscar-ubi">Buscar</button>
                      <mi-texto tipoTexto="parrafo">2-Seleccionar un punto en el mapa</mi-texto>
                    </form>

                    <div class="map"></div>
                        <div class="contenedor-button">
                            <button class="button-reportar"><mi-texto tipoTexto="parrafo">Reportar mascota</mi-texto></button>
                        </div>
                     
                        <div class="contenedor-button">
                            <button class="button-cancelar"><mi-texto tipoTexto="parrafo">Cancelar</mi-texto></button>
                        </div>
                       </div>
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
            .contenedor-title{
                padding: 50px 0;
            }

            .contenedor-subtitle{
                text-align:center;
                padding-bottom:25px;

              }

      
            .contenedor-inputs{

            }

            .caja-input{
                padding:25px 0;
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
            }


            .my-input{
                width:335px;
                height: 60px;
                border:none;
                border-radius:7px;
            }


            .contenedor-dropzone{
                cursor: pointer;
                padding-top:25px;


            }


            .dropzone{
              width:335px;
              height:300px;
            }


            .referencia{
                color:#5A8FEC;
                text-decoration: none;

            }

            .contenedor-button{
                padding:20px 0;
            }

            .button-agregar{
                background-color: #006CFC;
                width: 335px;
                height: 50px;
                border: none;
                border-radius: 5px;
                color: white;
                cursor: pointer;
                transition: transform 0.2s;
            }
            .button-reportar{
                background-color: #58D665;
                width: 335px;
                height: 50px;
                border: none;
                border-radius: 5px;
                color: white;
                cursor: pointer;
                transition: transform 0.2s;
            }

            .button-cancelar{
                background-color: #484E49;
                width: 335px;
                height: 50px;
                border: none;
                border-radius: 5px;
                color: white;
                cursor: pointer;
                transition: transform 0.2s;
            }

            .map{
                width:334px;
                height:253px;
            }

            .marker {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #007cbf; /* Color del marcador */
                border: 2px solid #fff; /* Borde del marcador */
              }
              
              .search-form{
                display: flex;
                flex-direction: column;
                justify-content: center;
              }

              .buscar-ubi{
                background-color: #58D665;
                width: 335px;
                height: 50px;
                border: none;
                border-radius: 5px;
                color: white;
                cursor: pointer;
                transition: transform 0.2s;
                margin:20px 0;
              }
            
        </style>
        `;
    const buttonReportar = this.querySelector(
      ".button-reportar"
    ) as HTMLButtonElement;
    //
    buttonReportar.addEventListener("click", async (e) => {
      e.preventDefault();
      const namePetInput = this.querySelector(".input-pet") as HTMLInputElement;
      const currentState = state.getState();
      currentState.petName = namePetInput.value;
      currentState.estadoPet = "perdido";
      state.setState(currentState);
      await state.createPet();
      Router.go("mascota-reportada");
    });
    //
    const buttonCancelar = this.querySelector(
      ".button-cancelar"
    ) as HTMLButtonElement;
    buttonCancelar.addEventListener("click", (e) => {
      e.preventDefault();
      Router.go("/mascotas-perdidas");
    });

    this.myFunctionDropzone();
    this.initMap();
    this.buscarDir();
  }

  myFunctionDropzone() {
    const imgDropzone = this.querySelector(".dropzone") as HTMLImageElement;
    let imageURL;

    const myDropzone = new Dropzone(".dropzone", {
      url: "/falsa",
      autoProcessQueue: false,
    });

    myDropzone.on("thumbnail", function (file) {
      const imageText = file.dataURL;
      const currentState = state.getState();
      imageURL = imageText;
      imgDropzone.src = imageURL;
      currentState.urlPetImage = imageURL;
      state.setState(currentState);
    });

    myDropzone.on("addedfile", function () {
      myDropzone.processQueue();
    });
  }
  initMap() {
    const mapContainer = this.querySelector(".map");
    const currentState = state.getState();
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-58.381775, -34.603851], // Coordenadas del Obelisco en Buenos Aires long-lat
      zoom: 0,
      maxBounds: [
        [-75, -55], // Esquina suroeste de Argentina
        [-53, -20], // Esquina noreste de Argentina
      ],
    });
  }

  initSearchForm(query: string) {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_TOKEN}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        const [longitude, latitude] = data.features[0].center;
        const placeName = data.features[0].place_name;
        const currentState = state.getState();
        const nameUbicacionPet = placeName.split(" ").slice(0, 4).join(" ");
        const nameUbicacion = nameUbicacionPet.split(",").join("");
        currentState.petNameUbi = nameUbicacion;
        state.setState(currentState);
        map.flyTo({ center: [longitude, latitude], zoom: 15 });
        map.on("click", (e) => {
          const { lng, lat } = e.lngLat;
          console.log(lng, lat);
          console.log(e);
          currentState.petLong = lng;
          currentState.petLat = lat;
          state.setState(currentState);
          // Eliminar marcadores existentes (si los hay)
          if (map.getLayer("marker")) {
            map.removeLayer("marker");
            map.removeSource("marker");
          }
          // Agregar marcador en la ubicación seleccionada
          map.addSource("marker", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [lng, lat],
                  },
                },
              ],
            },
          });

          map.addLayer({
            id: "marker",
            type: "symbol",
            source: "marker",
            layout: {
              "icon-image": "marker", // Cambia esto por el icono que desees
              "icon-size": 1.5,
            },
          });
        });
      })
      .catch((error) => {
        console.error("Error al realizar la búsqueda:", error);
      });
  }

  buscarDir() {
    const form = this.querySelector(".search-form") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target instanceof HTMLFormElement) {
        const query = e.target.q.value;
        if (query.trim() !== "") {
          this.initSearchForm(query);
        }
      }
    });
  }
}

customElements.define("create-report", createReport);

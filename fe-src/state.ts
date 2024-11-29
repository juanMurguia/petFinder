import * as dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
// Crea una instancia del cliente de Mapbox con tu token

const state = {
  data: {
    fullName: "",
    email: "",
    verificarEmail: "",
    password: "",
    updatePassword: "",
    localidad: "",
    userId: "",
    token: "",
    update: "",
    userLong: "",
    userLat: "",
    petName: "",
    tipoPet: "",
    idPet: "",
    petEstado: "",
    petNameUbi: "",
    petLong: "",
    petLat: "",
    urlPetImage: "",
    dataPet: "",
    dataPetUpdate: "",
    petEmailUser: "",
    nameReport: "",
    phoneReport: "",
    moreAboutReport: "",
    reportData: "",
  },
  listeners: [],

  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const callback of this.listeners) {
      callback();
    }
    console.log("Soy el state y he cambiado", this.data);
  },

  async signUp() {
    const currentState = this.getState();
    if (currentState.email) {
      const respuesta = await fetch(API_BASE_URL + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          fullName: currentState.fullName,
          email: currentState.email,
          password: currentState.password,
          localidad: currentState.localidad,
        }),
      });
      const data = await respuesta.json();
      console.log(data);
      currentState.userId = data.id;
      sessionStorage.setItem("user", JSON.stringify(currentState));
      this.setState(currentState);
    }
  },

  async autenticar() {
    const currentState = this.getState();
    if (currentState.email && currentState.password) {
      const responde = await fetch(API_BASE_URL + "/auth/token", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: currentState.email,
          password: currentState.password,
        }),
      });
      const data = await responde.json();
      console.log(data);
      currentState.token = data.token;
      this.setState(currentState);
    }
  },

  async signIn() {
    const currentState = this.getState();
    const response = await fetch(API_BASE_URL + "/me", {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${currentState.token}`,
      },
    });
    const data = await response.json();
    currentState.fullName = data.fullName;
    currentState.email = data.email;
    currentState.localidad = data.localidad;
    currentState.userId = data.id;
    currentState.userLat = data.lat;
    currentState.userLong = data.long;
    sessionStorage.setItem("user", JSON.stringify(currentState));
    this.setState(currentState);
  },

  cerrarSession() {
    sessionStorage.removeItem("user");
  },

  async verifyEmail() {
    const currentState = this.getState();
    if (currentState.email) {
      const response = await fetch(API_BASE_URL + "/verify-email", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: currentState.email,
        }),
      });
      const data = await response.json();
      console.log(data);
      currentState.verificarEmail = data;
      this.setState(currentState);
    }
  },

  async agregarDatos() {
    const currentState = this.getState();
    if (currentState.userId) {
      const response = await fetch(API_BASE_URL + "/update-data", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          fullName: currentState.fullName,
          localidad: currentState.localidad,
          userId: currentState.userId,
          long: currentState.userLong,
          lat: currentState.userLat,
        }),
      });
      const data = await response.json();
      currentState.update = data;
      this.setState(currentState);
    }
  },

  async updatePassword() {
    const currentState = this.getState();
    if (currentState.userId) {
      const response = await fetch(API_BASE_URL + "/update-password", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          password: currentState.updatePassword,
          userId: currentState.userId,
        }),
      });
      const data = await response.json();
      currentState.update = data;
      this.setState(currentState);
    }
  },

  async setLongLatUser(query: string) {
    const currentState = this.getState();
    const responde = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_TOKEN}`
    );
    if (query.trim() !== "") {
      const data = await responde.json();
      const [long, lat] = data.features[0].center;
      currentState.userLong = long;
      currentState.userLat = lat;
      sessionStorage.setItem("user", JSON.stringify(currentState));
      this.setState(currentState);
    }
  },

  async createPet() {
    const currentState = this.getState();
    if (currentState.userId) {
      const response = await fetch(API_BASE_URL + "/create-pet", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: currentState.userId,
          namePet: currentState.petName,
          estadoPet: currentState.petEstado,
          petImageUrl: currentState.urlPetImage,
          petLat: currentState.petLat,
          petLong: currentState.petLong,
          petUbicacion: currentState.petNameUbi,
        }),
      });
      const data = await response.json();
      console.log(data);
    }
  },

  async myPetsReportadas() {
    const currentState = this.getState();
    if (currentState.userId) {
      const response = await fetch(
        API_BASE_URL + "/mis-mascotas?userId=" + currentState.userId
      );
      const data = await response.json();
      currentState.dataPet = data;
      this.setState(currentState);
    }
  },

  async updateReport() {
    const currentState = this.getState();
    if (currentState.idPet) {
      const response = await fetch(API_BASE_URL + "/update-report", {
        method: "post",

        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: currentState.idPet,
          namePet: currentState.petName,
          petImageUrl: currentState.urlPetImage,
          estadoPet: currentState.petEstado,
          petLat: currentState.petLat,
          petLong: currentState.petLong,
          petUbicacion: currentState.petUbicacion,
        }),
      });
    }
  },

  async deleteReport() {
    const currentState = this.getState();
    const response = await fetch(API_BASE_URL + "/delete-report", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: currentState.idPet,
      }),
    });
    const data = await response.json();
    console.log(data);
  },

  async mascotasCerca() {
    const currentState = this.getState();
    if (currentState.userId) {
      const response = await fetch(
        API_BASE_URL +
          "/mascotas-cerca-de?=&lat=" +
          currentState.userLat +
          "&lng=" +
          currentState.userLong
      );
      const data = await response.json();
      currentState.dataPet = data;
      this.setState(currentState);
    }
  },

  async getUserPet() {
    const currentState = this.getState();
    const response = await fetch(
      API_BASE_URL + "/get-user-pet?id=" + currentState.idPet
    );
    const data = await response.json();
    currentState.petEmailUser = data.email;
    this.setState(currentState);
  },

  async createReport() {
    const currentState = this.getState();
    if (currentState.idPet) {
      const response = await fetch(API_BASE_URL + "/create-report", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: currentState.idPet,
          reportName: currentState.nameReport,
          phoneNumber: currentState.phoneReport,
          moreAbout: currentState.moreAboutReport,
        }),
      });
      const data = await response.json();
      currentState.reportData = data;
      this.setState(currentState);
    }
  },

  async sendEmailData() {
    const token = process.env.SENDGRID_API_KEY;
    const currentState = this.getState();
    const response = await fetch(API_BASE_URL + "/send-email", {
      method: "post",
      headers: {
        Authorization: ` Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: currentState.petEmailUser,
        nameReport: currentState.nameReport,
        phoneNumber: currentState.phoneReport,
        moreAboutReport: currentState.moreAboutReport,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al enviar el correo:", errorData);
    } else {
      console.log("Correo enviado exitosamente");
    }
  },
};

export function initializeApp() {
  const storageUser = sessionStorage.getItem("user");
  if (storageUser) {
    const userData = JSON.parse(storageUser);
    state.setState(userData);
  } else {
    console.log("user no logueado");
  }
}

export { state };

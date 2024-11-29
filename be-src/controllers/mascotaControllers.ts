import { User, Mascota } from "../associations/associations";
import { petDataAlgolia } from "../connectionDB";

import { cloudinary } from "../connectionDB";

export async function createPet(userPet) {
  const {
    userId,
    namePet,
    petImageUrl,
    estadoPet,
    petLat,
    petLong,
    petUbicacion,
  } = userPet;
  //
  const image = await cloudinary.uploader.upload(petImageUrl);
  const urlImage = image.secure_url;
  //
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (user) {
    //
    const petDB = await Mascota.create({
      userId: user.get("id"),
      namePet,
      petImageUrl: urlImage,
      estadoPet,
      petLat,
      petLong,
      petUbicacion,
    });
    try {
      const petAlgolia = await petDataAlgolia.saveObject({
        objectID: petDB.get("id"),
        namePet,
        petImageUrl: urlImage,
        estadoPet,
        _geoloc: {
          lat: petLat,
          lng: petLong,
        },
        userId: user.get("id"),
        petUbicacion,
      });
      return petDB;
    } catch (error) {
      return error;
    }
  }
}

export async function mascotasCerca(request) {
  const { lng, lat } = request.query;
  try {
    const mascotasFind = await petDataAlgolia.search("", {
      aroundLatLng: `${lat} , ${lng}`,
      aroundRadius: 40000, //40km
    });

    const mascotasCerca = mascotasFind.hits.map((hit: any) => {
      return {
        objectID: hit.objectID,
        namePet: hit.namePet,
        petImageUrl: hit.petImageUrl,
        _geoloc: hit._geoloc,
        userId: hit.userId,
        petUbicacion: hit.petUbicacion,
      };
    });
    return mascotasCerca;
  } catch (error) {
    return error;
  }
}

export async function myPetsAll(request, userId: number) {
  try {
    const myPets = await Mascota.findAll({
      where: {
        userId,
      },
    });
    return myPets;
  } catch (error) {
    return error;
  }
}

export async function eliminarPet(id) {
  try {
    const petDeleted = await Mascota.destroy({
      where: {
        id,
      },
    });
    const petAlgolia = await petDataAlgolia.deleteObject(id);
    return petDeleted;
  } catch (error) {
    return error;
  }
}

export async function actualizarMascota(userPet) {
  const { id, namePet, petImageUrl, estadoPet, petLat, petLong, petUbicacion } =
    userPet;
  //
  try {
    const image = await cloudinary.uploader.upload(petImageUrl);
    const urlImage = image.secure_url;
    //
    const updateMascota = await Mascota.update(
      {
        namePet,
        petImageUrl: urlImage,
        estadoPet,
        petLat,
        petLong,
        petUbicacion,
      },
      {
        where: {
          id,
        },
      }
    );
    const updateMascotaAlgolia = await petDataAlgolia.partialUpdateObject({
      objectID: id,
      namePet,
      petImageUrl: urlImage,
      estadoPet,
      _geoloc: {
        lat: petLat,
        lng: petLong,
      },
      petUbicacion,
    });
    return updateMascota;
  } catch (error) {
    return error;
  }
}

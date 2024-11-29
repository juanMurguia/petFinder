import { User } from "../associations/associations";
import { userDataAlgolia } from "../connectionDB";

export async function verifyEmail(userData) {
  const email = userData.email;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    return user.get("email");
  } else {
    return "no se encontro el user con ese email";
  }
}

export async function updateUser(userData) {
  const { userId, localidad, fullName, long, lat } = userData;
  const nuevoValores = {
    fullName,
    localidad,
    lat,
    long,
  };
  const userUpdate = await User.update(nuevoValores, {
    where: {
      id: userId,
    },
  });
  const user = await User.findOne({ where: { id: userId } });
  try {
    //Algolia datos del User buscado + only geoloc
    const usersAlgolia = await userDataAlgolia.partialUpdateObject({
      objectID: user.get("id"),
      fullName,
      localidad,
      _geoloc: {
        lat: lat,
        lng: long,
      },
    });
  } catch (error) {
    return error;
  }
  if (userData) {
    return userUpdate;
  } else {
    return "no se encontro el user";
  }
}

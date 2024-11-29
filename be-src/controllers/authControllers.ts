import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import { User, Mascota, Report } from "../associations/associations";
import { Auth } from "../models/auth";
import { userDataAlgolia } from "../connectionDB";

dotenv.config();
//
let secret = process.env.SECRET_CRYPTO;
//
function hashearPass(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export async function autenticarUser(userData) {
  const { fullName, email, password, localidad } = userData;

  const [user, userCreatedIs] = await User.findOrCreate({
    where: {
      email,
    },
    defaults: {
      fullName,
      email,
      localidad,
    },
  });
  const [auth, authCreatedIs] = await Auth.findOrCreate({
    where: {
      userId: user.get("id"),
    },
    defaults: {
      email,
      password: hashearPass(password),
      userId: user.get("id"),
    },
  });
  if (userCreatedIs === true) {
    const userAlgoliaDB = await userDataAlgolia.saveObject({
      objectID: user.get("id"),
      fullName,
      email,
      localidad,
    });
    return user; //user creado
  } else {
    return user; //user encontrado
  }
}

export async function autenticarToken(dataAuth) {
  const { email, password } = dataAuth;

  const auth = await Auth.findOne({
    where: {
      email,
      password: hashearPass(password),
    },
  });
  const user = await User.findOne({
    where: {
      id: auth.get("userId"),
    },
  });
  if (auth) {
    const token = jwt.sign({ user }, secret);
    return { token: token };
  }
}

export function myMiddlewareUser(request) {
  if (request.get("Authorization")) {
    const token = request.get("Authorization").split(" ")[1];

    try {
      const data = jwt.verify(token, secret);
      request.usuario = data.user;
      return request.usuario;
    } catch (error) {
      return error;
    }
  }
}

export async function getMe(request) {
  if (request.usuario) {
    const id = request.usuario.id;
    const userFind = await User.findOne({
      where: {
        id,
      },
    });
    return userFind;
  } else {
    throw "Error no hay data en el request.usuario";
  }
}

export async function updatePassword(userId: number, password: string) {
  const update = {
    password: hashearPass(password),
  };
  try {
    const updatePassword = await Auth.update(update, {
      where: {
        id: userId,
      },
    });
    return updatePassword;
  } catch (error) {
    return error;
  }
}

import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { User } from "../models";
import { Auth } from "../models";
import { usersClientIndex } from "../lib/algolia";
import * as dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

function getSHA256ofString(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export async function createUser(reqBody) {
  try {
    if (!reqBody) {
      throw new Error("Missing request body");
    }

    const { fullName, email, password, location } = reqBody;
    // Crear o encontrar user
    const [user, userCreated] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        fullName,
        email,
        location,
      },
    });

    // Crear o buscar auth
    const [auth, authCreated] = await Auth.findOrCreate({
      where: { userId: user.get("id") },
      defaults: {
        email: email,
        password: getSHA256ofString(password),
        userId: user.get("id"),
      },
    });

    if (userCreated) {
      await usersClientIndex.saveObject({
        objectID: user.get("id"),
        fullName,
        email,
        location,
      });
    }

    return user;
  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw error;
  }
}

export async function autenticarToken(dataAuth) {
  const { email, password } = dataAuth;

  const auth = await Auth.findOne({
    where: {
      email,
      password: getSHA256ofString(password),
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
    throw "Error no hay data";
  }
}

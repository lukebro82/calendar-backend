import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { generateJwt } from "../helpers/jwt";

export const createUser = async (data: any) => {
  const { name, email, password } = data;
  try {
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    user = new User({ name, email, password });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    const token = await generateJwt(user._id.toString(), user.name);

    return {
      ok: true,
      uid: user._id,
      name: user.name,
      token: token,
    };
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error ? error.message : "User creation error"
    );
  }
};

export const loginUser = async (data: any) => {
  const { email, password } = data;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User or Password is incorrect");
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new Error("User or Password is incorrect");
    }

    const token = await generateJwt(user._id.toString(), user.name);

    return {
      ok: true,
      uid: user._id,
      name: user.name,
      token: token,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error desconocido"
    );
  }
};

export const renewToken = async (req: any) => {
  const { uid, name } = req;

  const token = await generateJwt(uid, name);

  return {
    ok: true,
    token,
  };
};

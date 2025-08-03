import * as jwt from "jsonwebtoken";

const secret = process.env.SECRET_JWT_SEED;

export const generateJwt = (uid: string, name: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!secret) {
      reject(
        new Error("SECRET_JWT_SEED is not defined in environment variables")
      );
      return;
    }

    const payload = { uid, name };

    jwt.sign(payload, secret as string, { expiresIn: "2h" }, (error, token) => {
      if (error || !token) {
        reject(error || new Error("No token generated"));
      } else {
        resolve(token);
      }
    });
  });
};

export const verifyJwt = (
  token: string,
  secret: string
): Record<string, any> | null => {
  try {
    return jwt.verify(token, secret) as Record<string, any>;
  } catch (error) {
    return null;
  }
};

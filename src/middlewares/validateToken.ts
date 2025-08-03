import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  uid?: string;
  name?: string;
}

export const validatedToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No token provided",
    });
  }

  try {
    const secret = process.env.SECRET_JWT_SEED;
    const { uid, name } = jwt.verify(token, secret as string)as { uid: string; name: string }

    req.uid = uid;
    req.name = name;
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Invalid token",
    });
  }

  next();
};

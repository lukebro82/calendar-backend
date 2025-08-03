import express, { Request, Response } from "express";
import { createUser, loginUser, renewToken } from "../controllers/auth";
import {
  createUserValidations,
  loginValidations,
} from "../middlewares/validations";
import { validatedToken } from "../middlewares/validateToken";

const router = express.Router();

router.post(
  "/new",
  createUserValidations,
  async (req: Request, res: Response) => {
    try {
      const response = await createUser(req.body);
      res.status(200).send(response);
    } catch (error) {
      console.error("Error creating user:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";

      res.status(400).send({
        ok: false,
        message: errorMessage,
      });
    }
  }
);

router.post("/", loginValidations, async (req: Request, res: Response) => {
  try {
    const response = await loginUser(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.error("Error logging in user:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";

    res.status(400).send({
      ok: false,
      message: errorMessage,
    });
  }
});

router.get("/renew", validatedToken, async (req: Request, res: Response) => {
  try {
    const response = await renewToken(req);
    res.status(200).send(response);
  } catch (error) {
    console.error("Error validating user token:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";

    res.status(400).send({
      ok: false,
      message: errorMessage,
    });
  }
});

export default router;

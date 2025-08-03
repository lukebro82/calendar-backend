import express, { Request, Response } from "express";
import { validatedToken } from "../middlewares/validateToken";
import { createEventValidations } from "../middlewares/validations/";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/events";

const router = express.Router();
router.use(validatedToken);

router.get("/", async (req: Request, res: Response) => {
  try {
    const events = await getEvents();
    res.status(200).send({ ok: true, events });
  } catch (error) {
    console.error(error, "Error getting events");
    res.status(400).send({
      ok: false,
      message: error instanceof Error ? error.message : "unknown error",
    });
  }
});

router.post(
  "/",
  createEventValidations,
  async (req: Request, res: Response) => {
    try {
      const event = await createEvent(req);
      res.status(200).send({ pk: true, event });
    } catch (error) {
      console.error(error, "Error getting events");
      res.status(400).send({
        ok: false,
        message: error instanceof Error ? error.message : "unknown error",
      });
    }
  }
);

router.put("/:id", async (req: Request, res: Response) => {
  const eventId = req.params.id;

  try {
    const events = await updateEvent(eventId, req);
    res.status(200).send({ ok: true, events });
  } catch (error) {
    console.error(error, "Error getting events");
    res.status((error as any).statusCode || 400).send({
      ok: false,
      message: error instanceof Error ? error.message : "unknown error",
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const eventId = req.params.id;

  try {
    const events = await deleteEvent(eventId, req);
    res.status(200).send({ ok: true, events });
  } catch (error) {
    console.error(error, "Error getting events");
    res.status(400).send({
      ok: false,
      message: error instanceof Error ? error.message : "unknown error",
    });
  }
});

export default router;

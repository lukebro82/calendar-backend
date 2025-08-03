import { AuthenticatedRequest } from "../middlewares/validateToken";
import { Event } from "../models/Event";

export const getEvents = async () => {
  try {
    const events = await Event.find().populate("user", "name");
    return events;
  } catch (error) {
    console.error(error, "Error getting events");
    throw new Error(
      error instanceof Error ? error.message : "Error getting events"
    );
  }
};

export const createEvent = async (req: AuthenticatedRequest) => {
  const event = new Event({
    ...req.body,
    user: req.uid,
  });

  try {
    await event.save();
    return event;
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error ? error.message : "Event creation error"
    );
  }
};

export const updateEvent = async (
  eventId: string,
  req: AuthenticatedRequest
) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    if (event.user.toString() !== req.uid) {
      const error = new Error(
        "You do not have permission to update this event"
      );
      (error as any).statusCode = 401;
      throw error;
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return updatedEvent;
  } catch (error) {
    console.error(error, "Error updating event");

    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    throw new Error(
      error instanceof Error ? error.message : "Error updating event"
    );
  }
};

export const deleteEvent = async (
  eventId: string,
  req: AuthenticatedRequest
) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    if (event.user.toString() !== req.uid) {
      const error = new Error(
        "You do not have permission to update this event"
      );
      (error as any).statusCode = 401;
      throw error;
    }

    await Event.findByIdAndDelete(eventId);

    return { message: "Event deleted successfully" };
  } catch (error) {
    console.error(error, "Error updating event");

    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    throw new Error(
      error instanceof Error ? error.message : "Error updating event"
    );
  }
};

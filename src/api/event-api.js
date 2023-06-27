import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, EventSpec, EventSpecPlus, EventArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const eventApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const events = await db.eventStore.getAllEvents();
        return events;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: EventArraySpec, failAction: validationError },
    description: "Get all eventApi",
    notes: "Returns all eventApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const event = await db.eventStore.getEventById(request.params.id);
        if (!event) {
          return Boom.notFound("No event with this id");
        }
        return event;
      } catch (err) {
        return Boom.serverUnavailable("No event with this id");
      }
    },
    tags: ["api"],
    description: "Find a Event",
    notes: "Returns a event",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: EventSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const event = await db.eventStore.addEvent(request.params.id, request.payload);
        if (event) {
          return h.response(event).code(201);
        }
        return Boom.badImplementation("error creating event");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a event",
    notes: "Returns the newly created event",
    validate: { payload: EventSpec },
    response: { schema: EventSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.eventStore.deleteAllEvents();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all eventApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const event = await db.eventStore.getEventById(request.params.id);
        if (!event) {
          return Boom.notFound("No Event with this id");
        }
        await db.eventStore.deleteEventById(event._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Event with this id");
      }
    },
    tags: ["api"],
    description: "Delete a event",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};

import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const eventController = {
  index: {
    handler: async function (request, h) {
      let event = await db.eventStore.getEventById(request.params.id);

      const viewData = {
        event: event,
      };

      return h.view("event-view", viewData);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      const event = await db.eventStore.getEventById(request.params.id);
      try {
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          event.img = url;
          await db.eventStore.updateEvent(event);
        }
        return h.redirect(`/event/${event._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/event/${event._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};

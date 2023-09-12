import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const eventController = {
  index: {
    handler: async function (request, h) {
      let event = await db.eventStore.getEventById(request.params.id);

      if (isNaN(event.views)) {
        event.views = 0;
      }
      event.views = event.views + 1;

      await db.eventStore.updateEvent(event);

      const viewData = {
        event: event,
        cred: request.auth.credentials,
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
          event.image = url;
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

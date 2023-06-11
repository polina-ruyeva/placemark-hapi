import { db } from "../models/db.js";
import { EventSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);

      const viewData = {
        title: "Category",
        category: category,
        cred: request.auth.credentials,
      };

      return h.view("category-view", viewData);
    },
  },

  deleteCategory: {
    handler: async function (request, h) {
      await db.categoryStore.deleteCategoryById(request.params.id);

      return h.redirect("/dashboard");
    },
  },

  addEvent: {
    validate: {
      payload: EventSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("category-view", { title: "Add event error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newEvent = {
        //TODO
        name: request.payload.name,
        description: request.payload.description,
        date: request.payload.date,
        lon: request.payload.lon,
        lat: request.payload.lat,
      };
      await db.eventStore.addEvent(category._id, newEvent);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deleteEvent: {
    handler: async function (request, h) {
      await db.eventStore.deleteEventById(request.params.eventid);

      return h.redirect(`/category/${request.params.id}`);
    },
  },
};

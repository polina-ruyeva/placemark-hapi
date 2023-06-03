import { db } from "../models/db.js";
//import { TrackSpec } from "../models/joi-schemas.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);

      const viewData = {
        title: "Category",
        category: category,
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
      //payload: TrackSpec,
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

import { db } from "../models/db.js";
import { CategorySpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
      const viewData = {
        title: "Dashboard",
        user: loggedInUser,
        categories: categories,
        cred: request.auth.credentials,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCategory: {
    validate: {
      payload: CategorySpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add category error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCategory = {
        userid: loggedInUser._id,
        name: request.payload.name,
        cred: request.auth.credentials,
      };
      await db.categoryStore.addCategory(newCategory);
      return h.redirect("/dashboard");
    },
  },

  admin: {
    handler: async function (request, h) {
      if (request.auth.credentials && request.auth.credentials.admin) {
        const users = await db.userStore.getAllUsers();

        const viewData = {
          title: "User Administration",
          users: users,
          cred: request.auth.credentials,
        };

        return h.view("admin-view", viewData);
      } else {
        return h.response("Unauthorized").code(401);
      }
    },
  },
};

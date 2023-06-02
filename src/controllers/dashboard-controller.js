import { db } from "../models/db.js";
export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
      const viewData = {
        title: "Dashboard",
        user: loggedInUser,
        categories: categories,
      };
      return h.view("dashboard-view", viewData);
    },
  },
};

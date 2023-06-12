import { db } from "../models/db.js";

export const adminController = {
  index: {
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

  deleteUser: {
    handler: async function (request, h) {
      const userId = request.params.id;
      await db.userStore.deleteUserById(userId);
      return h.redirect("/admin");
    },
  },
};

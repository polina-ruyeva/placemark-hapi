import { db } from "../models/db.js";
//import { TrackSpec } from "../models/joi-schemas.js";

export const playlistController = {
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
        return h.view("playlist-view", { title: "Add track error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      const newTrack = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.trackStore.addTrack(playlist._id, newTrack);
      return h.redirect(`/playlist/${playlist._id}`);
    },
  },

  deleteTrack: {
    handler: async function (request, h) {
      db.trackStore.deleteTrackById(request.params.trackid);

      return h.redirect(`/playlist/${request.params.id}`);
    },
  },
};

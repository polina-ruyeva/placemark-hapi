export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Evento",
      };
      return h.view("about-view", viewData);
    },
  },
};

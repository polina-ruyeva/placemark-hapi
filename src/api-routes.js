import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import { eventApi } from "./api/event-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
  { method: "GET", path: "/api/categories", config: categoryApi.find },

  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },

  { method: "GET", path: "/api/events", config: eventApi.find },
  { method: "GET", path: "/api/events/{id}", config: eventApi.findOne },
  { method: "POST", path: "/api/categories/{id}/events", config: eventApi.create },
  { method: "DELETE", path: "/api/events", config: eventApi.deleteAll },
  { method: "DELETE", path: "/api/events/{id}", config: eventApi.deleteOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/events/{id}/images", config: eventApi.addImage },
];

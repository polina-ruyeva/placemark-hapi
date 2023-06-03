import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { categoryController } from "./controllers/category-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { eventController } from "./controllers/event-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },
  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "POST", path: "/category/{id}/addevent", config: categoryController.addEvent },

  { method: "GET", path: "/category/delete/{id}", config: categoryController.deleteCategory },

  { method: "GET", path: "/category/{id}/deleteevent/{eventid}", config: categoryController.deleteEvent },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "POST", path: "/event/{id}/uploadimage", config: eventController.uploadImage },
  { method: "GET", path: "/event/{id}", config: eventController.index },
];

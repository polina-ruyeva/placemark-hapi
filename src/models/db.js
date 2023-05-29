import { userMongoStore } from "./mongo/user-mongo-store.js";
import { eventMongoStore } from "./mongo/event-mongo-store.js";
import { categoryMongoStore } from "./mongo/category-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  eventStore: null,
  categoryStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.eventStore = eventMongoStore;
        this.categoryStore = categoryMongoStore;
        connectMongo();
        break;
      default:
    }
  },
};

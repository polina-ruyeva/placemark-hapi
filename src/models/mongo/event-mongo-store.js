import { Event } from "./event.js";

export const eventMongoStore = {
  async getAllEvents() {
    const events = await Event.find().lean();
    return events;
  },

  async getEventById(id) {
    if (id) {
      const event = await Event.findOne({ _id: id }).lean();
      return event;
    }
    return null;
  },

  async addEvent(event) {
    const newEvent = new Event(event);
    const eventObj = await newEvent.save();
    const e = await this.getEventById(eventObj._id);
    return e;
  },

  async deleteEventById(id) {
    try {
      await Event.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await Event.deleteMany({});
  },
};

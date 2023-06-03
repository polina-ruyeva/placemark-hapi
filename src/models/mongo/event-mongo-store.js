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

  async addEvent(categoryid, event) {
    event.categoryid = categoryid;
    const newEvent = new Event(event);
    const eventObj = await newEvent.save();
    const e = await this.getEventById(eventObj._id);
    return e;
  },

  async getEventsByCategoryId(id) {
    const events = await Event.find({ categoryid: id }).lean();
    return events;
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

  async updateEvent(event, updatedEvent) {
    const eventDoc = await Event.findOne({ _id: event._id });
    eventDoc.name = updatedEvent.name;
    eventDoc.description = updatedEvent.description;
    eventDoc.image = updatedEvent.image;
    await eventDoc.save();
  },
};

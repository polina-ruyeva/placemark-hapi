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

  async updateEvent(event) {
    const eventDoc = await Event.findOne({ _id: event._id });
    eventDoc.name = event.name;
    eventDoc.description = event.description;
    eventDoc.image = event.image;
    eventDoc.date = event.date;
    eventDoc.lon = event.lon;
    eventDoc.lat = event.lat;
    eventDoc.views = event.views;
    eventDoc.weatherid = event.weatherid;
    await eventDoc.save();
  },
};

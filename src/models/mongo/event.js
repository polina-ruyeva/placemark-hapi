import Mongoose from "mongoose";

const { Schema } = Mongoose;

const eventSchema = new Schema({
  name: String,
  category: String,
  description: String,
  views: Number,
});

export const Event = Mongoose.model("Event", eventSchema);

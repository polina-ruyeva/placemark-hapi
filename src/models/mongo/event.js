import Mongoose from "mongoose";

const { Schema } = Mongoose;

const eventSchema = new Schema({
  name: String,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  lon: Number,
  lat: Number,
  date: Date,
  image: String,
  weatherid: Number,
});

export const Event = Mongoose.model("Event", eventSchema);

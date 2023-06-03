import Mongoose from "mongoose";

const { Schema } = Mongoose;

const eventSchema = new Schema({
  name: String,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  description: String,
  views: Number,
  lon: Number,
  lat: Number,
  date: Date,
  image: {
    //TODO
    public_id: String,
    url: String,
  },
});

export const Event = Mongoose.model("Event", eventSchema);

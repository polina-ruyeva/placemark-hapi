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
});

export const Event = Mongoose.model("Event", eventSchema);

import mongoose from "mongoose";

// Define the Event Schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventType: { type: String, required: true },
  foodType: { type: String, required: true },
  peopleCount: { type: Number, required: true },
  image: { type: String, required: true }, // base64 encoded image
  createdAt: { type: Date, default: Date.now },
});

// Create Event Model
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;

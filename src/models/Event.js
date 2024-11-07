import mongoose from "mongoose";

// Define the Event Schema
const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventType: { type: String, required: true },
  foodType: { type: String, required: true },
  peopleCount: { type: Number, required: true },
  image: { type: String, required: true }, // base64 encoded image
  basePrice: { type: Number, default: 10000 }, // Default bidding price
  createdAt: { type: Date, default: Date.now },
});

// Create Event Model
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;

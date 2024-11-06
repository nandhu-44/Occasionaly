import { NextResponse } from "next/server";
import MongoConnect from "@/utils/MongoConnect";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Connect to MongoDB
await MongoConnect();

// Define schemas
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create models
const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);
const Location =
  mongoose.models.Location || mongoose.model("Location", LocationSchema);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    console.log("GET request - type:", type);

    switch (type) {
      case "service":
        const services = await Service.find({}).sort({ createdAt: -1 });
        return NextResponse.json(services);

      case "location":
        const locations = await Location.find({}).sort({ createdAt: -1 });
        return NextResponse.json(locations);

      default:
        return NextResponse.json(
          { error: "Invalid type. Use 'service' or 'location'" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { type, data } = await request.json();

    switch (type) {
      case "service":
        const newService = new Service(data);
        const savedService = await newService.save();
        return NextResponse.json(savedService);

      case "location":
        const newLocation = new Location(data);
        const savedLocation = await newLocation.save();
        return NextResponse.json(savedLocation);

      default:
        return NextResponse.json(
          { error: "Invalid type. Use 'service' or 'location'" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

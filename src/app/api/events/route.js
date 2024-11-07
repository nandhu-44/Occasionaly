import MongoConnect from "@/utils/MongoConnect";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Connect to MongoDB
MongoConnect();

// Handle POST requests
export const POST = async (req) => {
  try {
    // Verify authentication
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 },
      );
    }

    // Verify token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Parse the request body as JSON
    const body = await req.json();
    const {
      title,
      description,
      eventType,
      foodType,
      peopleCount,
      basePrice,
      image,
    } = body;

    // Validate the required fields
    if (
      !title ||
      !description ||
      !eventType ||
      !foodType ||
      !peopleCount ||
      !image ||
      !basePrice
    ) {
      return NextResponse.json(
        { message: "Please provide all required fields." },
        { status: 400 },
      );
    }

    // Create a new event instance
    const newEvent = new Event({
      userId,
      title,
      description,
      eventType,
      foodType,
      peopleCount,
      basePrice,
      image, // Ensure the image is handled properly (as base64 or URL)
    });

    // Save the event to MongoDB
    const savedEvent = await newEvent.save();

    // Return success response
    return NextResponse.json(
      {
        message: "Event created successfully!",
        event: savedEvent,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export async function GET(req) {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching events" },
      { status: 500 },
    );
  }
}

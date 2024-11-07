import { NextResponse } from "next/server";
import Event from "@/models/Event";
import MongoConnect from "@/utils/MongoConnect";

// Connect to MongoDB
await MongoConnect();

export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Find event by ID
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event, { status: 200 });

  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { message: "Error fetching event" },
      { status: 500 }
    );
  }
}
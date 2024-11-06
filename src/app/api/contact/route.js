import { NextResponse } from "next/server";
import MongoConnect from "@/utils/MongoConnect";
import mongoose from "mongoose";

// Connect to MongoDB
await MongoConnect();

// Define Contact schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create Contact model
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 },
      );
    }

    // Create new contact message
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save to database
    await newContact.save();

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

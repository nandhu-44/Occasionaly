import User from "@/models/User";
import MongoConnect from "@/utils/MongoConnect";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");

// Ensure database connection
MongoConnect();

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 },
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials." }, {
        status: 401,
      }); // Unauthorized
    }

    // Compare password with stored hash
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ message: "Invalid credentials." }, {
        status: 401,
      }); // Unauthorized
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Token expires in 24 hour
    });

    // Return success with token
    return NextResponse.json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging

    // Handle unexpected errors
    return NextResponse.json({
      message: "Something went wrong.",
      error: error.message,
    }, { status: 500 });
  }
}

import User from "@/models/User";
import MongoConnect from "@/utils/MongoConnect";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";

MongoConnect();

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { username, email, password, accountType } = body;
    // console.log(body);

    // Basic validation
    if (!username || !email || !password || !accountType) {
      return NextResponse.json({ message: "All fields are required." }, {
        status: 400,
      });
    }

    // Check if the user already exists (by email or username)
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username or email already exists." },
        { status: 400 },
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
      accountType,
    });

    // Save the user to the database
    await newUser.save();

    // Optionally create a JWT token (auto-login after registration)
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h", // Token expires in 24 hour
      },
    );

    // Return success message and token
    return NextResponse.json({ message: "Registration successful.", token });
  } catch (error) {
    // Handle unexpected errors
    return NextResponse.json({ message: "Something went wrong." }, {
      status: 500,
    });
  }
}

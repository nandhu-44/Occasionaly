import User from "@/models/User";
import MongoConnect from "@/utils/MongoConnect";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

MongoConnect();

export async function GET(req) {
  // Token is passed in the Authorization header, remove the "Bearer " part
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Return user data after removing sensitive information
    const { password, ...userData } = user._doc;
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
}

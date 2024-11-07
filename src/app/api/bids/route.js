// src/app/api/bids/route.js
import { NextResponse } from "next/server";
import Bid from "@/models/Bid";
import jwt from "jsonwebtoken";
import MongoConnect from "@/utils/MongoConnect";

export async function POST(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { eventId, amount } = await req.json();

    const newBid = new Bid({
      eventId,
      vendorId: decoded.id,
      amount,
    });

    await newBid.save();

    return NextResponse.json(
      { message: "Bid placed successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
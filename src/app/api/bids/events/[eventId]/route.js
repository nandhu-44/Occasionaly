import { NextResponse } from "next/server";
import Bid from "@/models/Bid";
import jwt from "jsonwebtoken";
import MongoConnect from "@/utils/MongoConnect";

export async function GET(req, { params }) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await MongoConnect();

    // Get bids for the event and populate vendor details
    const bids = await Bid.find({ eventId: params.eventId })
      .populate('vendorId', 'accountType email username')
      .sort({ createdAt: -1 });

    return NextResponse.json(bids);
  } catch (error) {
    console.error('Error fetching bids:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
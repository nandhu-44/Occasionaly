import MongoConnect from "@/utils/MongoConnect";
import Bid from "@/models/Bid";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    // Get authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Extract and verify token
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log(decoded);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Connect to database
    await MongoConnect();

    const { status } = await req.json();
    const bidId = params.id;

    // Validate status
    if (!["accepted", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // Find the bid and populate event details
    const bid = await Bid.findById(bidId)
      .populate({
        path: 'eventId',
        select: 'userId title'  // Only populate needed fields
      })
      .populate({
        path: 'vendorId',
        select: 'username email accountType'  // Only populate needed fields
      });

    if (!bid) {
      return NextResponse.json({ error: "Bid not found" }, { status: 404 });
    }

    // Check if user is the event owner using the decoded token user ID
    if (bid.eventId.userId.toString() !== decoded.id) {
      return NextResponse.json(
        { error: "Only event owner can update bid status" },
        { status: 403 }
      );
    }

    // If accepting a bid, check if any other bid is already accepted
    if (status === "accepted") {
      const existingAcceptedBid = await Bid.findOne({
        eventId: bid.eventId._id,
        status: "accepted",
      });

      if (existingAcceptedBid) {
        return NextResponse.json(
          { error: "Another bid is already accepted" },
          { status: 400 }
        );
      }
    }

    // Update the bid
    bid.status = status;
    await bid.save();

    return NextResponse.json(bid);
  } catch (error) {
    console.error("Bid update error:", error);
    return NextResponse.json(
      { error: "Failed to update bid" },
      { status: 500 }
    );
  }
}

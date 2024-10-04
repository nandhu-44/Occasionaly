import MongoConnect from "@/utils/MongoConnect";
import { NextResponse } from "next/server";

MongoConnect();

export async function POST(req) {
    // Parse the request body
    const body = await req.json();
    const { email, password } = body;
    console.log(email, password);

    return NextResponse.json({ message: "Request received." });
}

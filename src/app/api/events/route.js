import MongoConnect from "@/utils/MongoConnect";
import Event from "@/models/Event";

// Connect to MongoDB
MongoConnect();

// Handle POST requests
export const POST = async (req) => {
  try {
    // Parse the request body as JSON
    const body = await req.json();
    const { title, description, eventType, foodType, peopleCount, image } = body;

    // Validate the required fields
    if (!title || !description || !eventType || !foodType || !peopleCount || !image) {
      console.log("Missing fields:", {
        title,
        description,
        eventType,
        foodType,
        peopleCount,
        image,
      });
      return new Response(
        JSON.stringify({ message: "Please provide all required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Create a new event instance
    const newEvent = new Event({
      title,
      description,
      eventType,
      foodType,
      peopleCount,
      image, // Ensure the image is handled properly (as base64 or URL)
    });

    // Save the event to MongoDB
    const savedEvent = await newEvent.save();

    // Return success response
    return new Response(
      JSON.stringify({
        message: "Event created successfully!",
        event: savedEvent,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

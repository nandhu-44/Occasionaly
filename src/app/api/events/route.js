import MongoConnect from "@/utils/MongoConnect";
import Event from "@/models/Event";

const connectToMongoDB = async () => {
  await MongoConnect();
};

// Handle POST requests
export const POST = async (req) => {
  try {
    await connectToMongoDB();

    // Use req.formData() to parse FormData
    const formData = await req.formData();

    // Log the formData for debugging
    console.log("Form Data Received:", formData);

    // Extract data from formData
    const title = formData.get("title");
    const description = formData.get("description");
    const eventType = formData.get("eventType");
    const foodType = formData.get("foodType");
    const peopleCount = formData.get("peopleCount");
    const image = formData.get("image");

    // Validate the required fields
    if (
      !title ||
      !description ||
      !eventType ||
      !foodType ||
      !peopleCount ||
      !image
    ) {
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

    // Create new event
    const newEvent = new Event({
      title,
      description,
      eventType,
      foodType,
      peopleCount,
      image, // Ensure this is handled properly
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

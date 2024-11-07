"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast"; // Import your toast hook
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function EventForm() {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to create an event",
        variant: "destructive",
      });
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const [eventData, setEventData] = useState({
    title: "",
    eventType: "",
    foodType: "",
    peopleCount: "",
    description: "",
    image: null,
    basePrice: "", // Add this new field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData((prev) => ({ ...prev, image: file }));
    } else {
      setEventData((prev) => ({ ...prev, image: null })); // Optional: reset image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = null;
    if (eventData.image) {
      const reader = new FileReader();
      base64Image = await new Promise((resolve) => {
        reader.onload = () => {
          // Add the MIME type prefix to the base64 string
          const imageType = eventData.image.type || "image/jpeg";
          const base64String = reader.result.split(",")[1];
          resolve(`data:${imageType};base64,${base64String}`);
        };
        reader.readAsDataURL(eventData.image);
      });
    }

    // Prepare the event data to be sent as JSON
    const dataToSubmit = {
      ...eventData,
      image: base64Image,
      userId: user._id, // Add user ID to submission
    };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add auth token
        },
        body: JSON.stringify(dataToSubmit),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.message || "Failed to create event.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Event Created",
        description: "Your event has been created successfully.",
        variant: "success",
      });

      // Reset the form
      setEventData({
        title: "",
        eventType: "",
        foodType: "",
        peopleCount: "",
        description: "",
        image: null,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto max-w-lg">
        <CardContent className="p-6">
          <h1 className="mb-4 text-2xl font-bold">Create New Event</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="eventType">Event Type</Label>
              <Select
                onValueChange={(value) =>
                  setEventData((prev) => ({ ...prev, eventType: value }))
                }
              >
                <SelectTrigger id="eventType">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wedding">Wedding</SelectItem>
                  <SelectItem value="Conference">Conference</SelectItem>
                  <SelectItem value="Party">Party</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="foodType">Food Type</Label>
              <Select
                onValueChange={(value) =>
                  setEventData((prev) => ({ ...prev, foodType: value }))
                }
              >
                <SelectTrigger id="foodType">
                  <SelectValue placeholder="Select food type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="NonVegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="peopleCount">Number of People</Label>
              <Input
                id="peopleCount"
                name="peopleCount"
                value={eventData.peopleCount}
                onChange={handleInputChange}
                placeholder="Enter number of people"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="basePrice">Minimum Bid Amount</Label>
              <Input
                id="basePrice"
                name="basePrice"
                type="number"
                value={eventData.basePrice}
                onChange={handleInputChange}
                placeholder="Enter minimum bid amount"
                required
                min="0"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="description">Event Description</Label>
              <Textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                placeholder="Write event details here"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="image">Upload Event Image</Label>
              <Input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
            </div>
            <Button type="submit">Create Event</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

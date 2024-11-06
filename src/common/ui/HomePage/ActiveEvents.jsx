"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/common/components/Loader";

const ActiveEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <Loader />;
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event._id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={event.image || "/events/default-event.jpg"}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="mb-2 text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-600">Type: {event.eventType}</p>
            <p className="text-sm text-gray-600">Food: {event.foodType}</p>
            <p className="text-sm text-gray-600">People: {event.peopleCount}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActiveEvents;

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/common/components/Loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ActiveEvents = ({ filters }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  const filteredEvents = events.filter((event) => {
    return (
      (filters?.eventType === "All" ||
        event.eventType === filters?.eventType) &&
      (filters?.foodType === "All" || event.foodType === filters?.foodType) &&
      (filters?.peopleCount === "All" ||
        (filters?.peopleCount === "<100" && event.peopleCount < 100) ||
        (filters?.peopleCount === "100-300" &&
          event.peopleCount >= 100 &&
          event.peopleCount <= 300) ||
        (filters?.peopleCount === ">300" && event.peopleCount > 300))
    );
  });

  if (loading) return <Loader />;
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen rounded-lg bg-yellow-400 py-20 pt-8">
      <h2 className="mb-8 text-center text-3xl font-bold">Active Events</h2>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-4 md:px-4 lg:px-32">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Card
              key={event._id}
              className="hover:cursor-pointer group w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition-all hover:shadow-xl"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={event.image || "/events/default-event.jpg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  quality={70}
                  blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAEALAAAAAABAAEAAAICTAEAOw=="
                />
              </div>
              <CardContent className="p-4">
                <h3 className="line-clamp-1 text-lg font-semibold text-gray-800">
                  {event.title}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-500">{event.eventType}</span>
                  <span className="text-gray-600">{event.location}</span>
                </div>
                <div className="mt-2 space-y-1 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Food:</span>
                    {event.foodType}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Attendees:</span>
                    {event.peopleCount}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    onClick={() => router.push(`/events/${event._id}`)}
                    className="w-full"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <p className="mt-8 text-center text-gray-800">
            No events match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default ActiveEvents;

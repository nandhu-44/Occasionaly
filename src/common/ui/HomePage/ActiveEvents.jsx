import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const events = [
  {
    id: 1,
    title: "The Job Hunting Accelerator Bootcamp -Land Your Drea..",
    location: "Innoland Co-working Center",
    price: "$65",
    type: "Wedding",
    imageUrl: "/events/event-1.avif",
    foodType: "Vegetarian",
    peopleCount: 150,
  },
  {
    id: 2,
    title: "The Job Hunting Accelerator Bootcamp -Land Your Drea..",
    location: "Innoland Co-working Center",
    price: "$65",
    type: "Wedding",
    imageUrl: "/events/event-2.jpg",
    foodType: "NonVegetarian",
    peopleCount: 200,
  },
  {
    id: 3,
    title: "The Job Hunting Accelerator Bootcamp -Land Your Drea..",
    location: "Innoland Co-working Center",
    price: "$65",
    type: "Conference",
    imageUrl: "/events/event-3.jpg",
    foodType: "Mixed",
    peopleCount: 500,
  },
];

const eventsList = [].concat(events, events, events, events);

export function ActiveEvents({ filters }) {
  const filteredEvents = eventsList.filter((event) => {
    return (
      (filters.eventType === "All" || event.type === filters.eventType) &&
      (filters.foodType === "All" || event.foodType === filters.foodType) &&
      (filters.peopleCount === "All" ||
        (filters.peopleCount === "<100" && event.peopleCount < 100) ||
        (filters.peopleCount === "100-300" &&
          event.peopleCount >= 100 &&
          event.peopleCount <= 300) ||
        (filters.peopleCount === ">300" && event.peopleCount > 300))
    );
  });

  return (
    <div className="min-h-screen rounded-lg bg-yellow-400 py-20 pt-8">
      <h2 className="mb-8 text-center text-3xl font-bold">Active Events</h2>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-4 md:px-4 lg:px-32">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <Card
              key={index}
              className="w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg"
            >
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={300}
                height={300}
                className="aspect-square h-48 w-full object-cover"
                loading="lazy"
                priority={false}
                placeholder="blur"
                quality={70}
                blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAEALAAAAAABAAEAAAICTAEAOw=="
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {event.location}
                </h3>
                <p className="mt-2 text-gray-600">{event.title}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded bg-orange-500 px-3 py-1 text-white">
                    {event.price}
                  </span>
                  <span className="text-gray-500">{event.type}</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Food: {event.foodType}</p>
                  <p>Attendees: {event.peopleCount}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {filteredEvents.length === 0 && (
        <p className="mt-8 text-center text-gray-800">
          No events match the selected filters.
        </p>
      )}
    </div>
  );
}
export default ActiveEvents;

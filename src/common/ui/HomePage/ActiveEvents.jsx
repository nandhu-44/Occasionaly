import Image from "next/image";
import React from "react";

const events = [
  {
    id: 1,
    title: "The Job Hunting Accelerator Bootcamp -Land Your Drea..",
    location: "Innoland Co-working Center",
    price: "$65",
    type: "Wedding",
    imageUrl: "/events/event-1.avif",
  },
  {
    id: 2,
    title: "The Job Hunting Accelerator Bootcamp -Land Your Drea..",
    location: "Innoland Co-working Center",
    price: "$65",
    type: "Wedding",
    imageUrl: "/events/event-2.jpg",
  },
  {
    id: 3,
    title: "The Job Hunting Accelerator Bootcamp -Land Your Drea..",
    location: "Innoland Co-working Center",
    price: "$65",
    type: "Wedding",
    imageUrl: "/events/event-3.jpg",
  },
];

const eventsList = [].concat(events, events, events, events);

const ActiveEvents = () => {
  return (
    <div className="bg-yellow-400 py-20">
      <h2 className="mb-8 text-center text-3xl font-bold">Active Events</h2>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-4 md:px-4 lg:px-32">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {eventsList.map((event, index) => (
            <div
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
              <div className="p-4">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveEvents;

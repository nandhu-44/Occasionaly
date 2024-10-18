import React from "react";
import Header from "@/common/components/Header";
import ActiveEvents from "./ActiveEvents";

const HomePage = () => {
  // Default filters that show all events
  const defaultFilters = {
    eventType: "All", // No filtering by event type
    foodType: "All", // No filtering by food type
    peopleCount: "All", // No filtering by attendees count
  };

  return (
    <>
      <Header />
      <ActiveEvents filters={defaultFilters} />
    </>
  );
};

export default HomePage;

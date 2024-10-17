import React from "react";
import Navbar from "@/common/components/Navbar";
import Footer from "@/common/components/Footer";
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
      <Navbar />
      <Header />
      <ActiveEvents filters={defaultFilters} />
      <Footer />
    </>
  );
};

export default HomePage;

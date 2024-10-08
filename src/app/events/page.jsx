import React from "react";
import EventsPage from "@/common/ui/EventsPage/EventsPage";
import Navbar from "@/common/components/Navbar";
import Footer from "@/common/components/Footer";

const EventsPageWrapper = () => {
  return (
    <>
      <Navbar />
      <EventsPage />
      <Footer />
    </>
  );
};

export default EventsPageWrapper;

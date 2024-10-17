import React from "react";
import Navbar from "@/common/components/Navbar";
import Footer from "@/common/components/Footer";
import EventForm from "@/common/ui/EventsPage/EventForm";

export default function CreateEventPage() {
  return (
    <>
      <Navbar />
      <EventForm />
      <Footer />
    </>
  );
}

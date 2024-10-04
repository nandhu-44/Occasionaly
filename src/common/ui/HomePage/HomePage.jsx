import React from "react";
import Navbar from "@/common/components/Navbar";
import Footer from "@/common/components/Footer";
import Header from "@/common/components/Header";
import ActiveEvents from "./ActiveEvents";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <ActiveEvents />
      <Footer />
    </>
  );
};

export default HomePage;

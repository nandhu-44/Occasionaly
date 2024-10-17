"use client";

import React, { useState } from "react";
import ServiceList from "./ServiceList";
import LocationList from "./LocationList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VendorPage = () => {
  const [activeTab, setActiveTab] = useState("services");

  const toggleTab = () => {
    setActiveTab(activeTab === "services" ? "locations" : "services");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Vendor Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {activeTab === "services" ? "Services" : "Locations"}
            </h2>
            <Button onClick={toggleTab}>
              Switch to {activeTab === "services" ? "Locations" : "Services"}
            </Button>
          </div>
          {activeTab === "services" ? <ServiceList /> : <LocationList />}
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorPage;

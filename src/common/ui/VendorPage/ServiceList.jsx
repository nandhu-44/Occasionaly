import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("/api/locations");
      setLocations(response.data);
    } catch (error) {
      console.error("Failed to fetch locations", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <Card key={location._id}>
          <CardHeader>
            <CardTitle>{location.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Address: {location.address}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ServiceList = ({ services }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services?.map((service) => (
        <Card key={service._id} className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">${service.price}</p>
            <p className="text-gray-600">{service.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceList;

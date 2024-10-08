import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceList = () => {
  // This is a placeholder. In a real application, you'd fetch this data from an API
  const services = [
    { id: 1, name: "Photography", price: "$500" },
    { id: 2, name: "Catering", price: "$1000" },
    { id: 3, name: "Venue Decoration", price: "$750" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.id}>
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Price: {service.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceList;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LocationList = () => {
  // This is a placeholder. In a real application, you'd fetch this data from an API
  const locations = [
    { id: 1, name: "City Hall", address: "123 Main St, City" },
    { id: 2, name: "Beach Resort", address: "456 Ocean Ave, Beach Town" },
    { id: 3, name: "Mountain Lodge", address: "789 Peak Rd, Mountain View" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <Card key={location.id}>
          <CardHeader>
            <CardTitle>{location.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{location.address}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LocationList;

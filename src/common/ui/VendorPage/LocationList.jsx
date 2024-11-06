import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LocationList = ({ locations }) => {
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

export default LocationList;

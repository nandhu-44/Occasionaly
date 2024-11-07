"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import ActiveEvents from "../HomePage/ActiveEvents";

export default function EventsPage() {
  const { user, isAuthenticated } = useUser();
  const [filters, setFilters] = React.useState({
    eventType: "All",
    foodType: "All",
    peopleCount: "All",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateEventClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to create an event",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        {isAuthenticated
          ? (
            <Link href="/create-event">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
              </Button>
            </Link>
          )
          : (
            <Button onClick={handleCreateEventClick}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
            </Button>
          )}
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="h-fit w-full lg:w-64">
          <CardContent className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Filters</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="eventType" className="mb-2 block">
                  Event Type
                </Label>
                <Select
                  value={filters.eventType}
                  onValueChange={(value) =>
                    handleFilterChange("eventType", value)}
                >
                  <SelectTrigger id="eventType">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Wedding">Wedding</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Party">Party</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="foodType" className="mb-2 block">
                  Food Type
                </Label>
                <Select
                  value={filters.foodType}
                  onValueChange={(value) =>
                    handleFilterChange("foodType", value)}
                >
                  <SelectTrigger id="foodType">
                    <SelectValue placeholder="Select food type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="NonVegetarian">
                      Non-Vegetarian
                    </SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="peopleCount" className="mb-2 block">
                  Number of People
                </Label>
                <Select
                  value={filters.peopleCount}
                  onValueChange={(value) =>
                    handleFilterChange("peopleCount", value)}
                >
                  <SelectTrigger id="peopleCount">
                    <SelectValue placeholder="Select number of people" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="<100">Less than 100</SelectItem>
                    <SelectItem value="100-300">100 - 300</SelectItem>
                    <SelectItem value=">300">More than 300</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex-1">
          <ActiveEvents filters={filters} />
        </div>
      </div>
    </div>
  );
}

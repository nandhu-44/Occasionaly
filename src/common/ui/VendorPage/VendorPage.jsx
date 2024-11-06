"use client";

import React, { useState, useEffect } from "react";
import ServiceList from "./ServiceList";
import LocationList from "./LocationList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";

const VendorPage = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const { user } = useUser();

  const serviceForm = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
    },
  });

  const locationForm = useForm({
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/services?type=service", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch services", error);
      setServices([]);
    }
  };

  const fetchLocations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/services?type=location", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocations(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch locations", error);
      setLocations([]);
    }
  };

  useEffect(() => {
    if (activeTab === "services") {
      fetchServices();
    } else {
      fetchLocations();
    }
  }, [activeTab]);

  const onSubmitService = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/services",
        {
          type: "service",
          data: {
            name: data.name,
            price: parseFloat(data.price),
            description: data.description,
            userId: user?._id,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      await fetchServices();
      setIsDialogOpen(false);
      serviceForm.reset();
    } catch (error) {
      console.error("Failed to add service", error);
    }
  };

  const onSubmitLocation = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/services",
        {
          type: "location",
          data: {
            name: data.name,
            address: data.address,
            userId: user?._id,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      await fetchLocations();
      setIsLocationDialogOpen(false);
      locationForm.reset();
    } catch (error) {
      console.error("Failed to add location", error);
    }
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
            <div className="flex gap-4">
              <Button
                onClick={() =>
                  setActiveTab(
                    activeTab === "services" ? "locations" : "services",
                  )
                }
              >
                Switch to {activeTab === "services" ? "Locations" : "Services"}
              </Button>

              {activeTab === "services" ? (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Add Service</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Service</DialogTitle>
                    </DialogHeader>
                    <Form {...serviceForm}>
                      <form
                        onSubmit={serviceForm.handleSubmit(onSubmitService)}
                        className="space-y-4"
                      >
                        {/* Service form fields */}
                        <FormField
                          control={serviceForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter service name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={serviceForm.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="Enter price"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={serviceForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter description"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          Add Service
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog
                  open={isLocationDialogOpen}
                  onOpenChange={setIsLocationDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">Add Location</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Location</DialogTitle>
                    </DialogHeader>
                    <Form {...locationForm}>
                      <form
                        onSubmit={locationForm.handleSubmit(onSubmitLocation)}
                        className="space-y-4"
                      >
                        <FormField
                          control={locationForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter location name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={locationForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          Add Location
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
          {activeTab === "services" ? (
            <ServiceList services={services} />
          ) : (
            <LocationList locations={locations} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorPage;

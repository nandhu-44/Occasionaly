"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Mail,
  Users,
  Utensils,
} from "lucide-react";

export default function EventDetails({ params }) {
  const { user, isAuthenticated } = useUser();
  const [event, setEvent] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchEventAndBids = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      // Fetch event details
      const eventRes = await fetch(`/api/events/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const eventData = await eventRes.json();
      setEvent(eventData);

      // Fetch bids if user is authenticated and is either vendor or event creator
      if (
        isAuthenticated &&
        (user?.accountType === "vendor" || user?._id === eventData.userId)
      ) {
        const bidsRes = await fetch(`/api/bids/events/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!bidsRes.ok) {
          throw new Error("Failed to fetch bids");
        }

        const bidsData = await bidsRes.json();
        setBids(bidsData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch event details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBidAction = async (bidId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/bids/${bidId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${status} bid`);
      }

      // Show success message
      toast({
        title: "Success",
        description: `Bid ${status} successfully`,
      });

      // Update local state by refreshing bids
      const refreshedBids = await fetch(`/api/bids/events/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!refreshedBids.ok) {
        throw new Error("Failed to refresh bids");
      }

      const bidsData = await refreshedBids.json();
      setBids(bidsData);

      // If bid was accepted, reject all other pending bids
      if (status === "accepted") {
        const otherPendingBids = bidsData.filter(
          (bid) => bid._id !== bidId && bid.status === "pending"
        );

        // Reject all other pending bids
        await Promise.all(
          otherPendingBids.map((bid) =>
            fetch(`/api/bids/${bid._id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ status: "rejected" }),
            })
          )
        );

        // Refresh bids one final time to get updated state
        const finalBidsRes = await fetch(`/api/bids/events/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const finalBidsData = await finalBidsRes.json();
        setBids(finalBidsData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${status} bid`,
        variant: "destructive",
      });
    }
  };

  const handleBid = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: event._id,
          amount: parseFloat(bidAmount),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place bid");
      }

      toast({
        title: "Success",
        description: "Bid placed successfully",
      });

      // Refresh bids
      const bidsRes = await fetch(`/api/bids/events/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const bidsData = await bidsRes.json();
      setBids(bidsData);
      setBidAmount("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to place bid",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEventAndBids();
  }, [params.id, isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!event) return null;

  const getBadgeVariant = (status) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{event.title}</CardTitle>
              <CardDescription>
                Created {new Date(event.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg">
              ${event.basePrice.toLocaleString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>
                  <strong>Event Type:</strong> {event.eventType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-muted-foreground" />
                <span>
                  <strong>Food Type:</strong> {event.foodType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>
                  <strong>People Count:</strong> {event.peopleCount}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          </div>

          {user?.accountType === "vendor" && user?._id !== event.userId && (
            <>
              <Separator className="my-6" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Place Your Bid</h3>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter bid amount"
                    className="max-w-xs"
                  />
                  <Button
                    onClick={handleBid}
                    disabled={!bidAmount || parseFloat(bidAmount) <= 0}
                  >
                    Place Bid
                  </Button>
                </div>
              </div>
            </>
          )}

          {user?._id === event.userId && (
            <>
              <Separator className="my-6" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Bids</h3>
                <div className="grid gap-4">
                  {Array.isArray(bids) && bids.length > 0 ? (
                    bids.map((bid) => (
                      <Card key={bid._id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                              {/* Vendor Info */}
                              <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">
                                  {bid.vendorId?.username || 'Unknown Vendor'}
                                </span>
                                <Badge variant="outline">
                                  {bid.vendorId?.accountType || 'vendor'}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {bid.vendorId?.email || 'No email provided'}
                                </span>
                              </div>

                              {/* Bid Info */}
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium text-lg">
                                  ${typeof bid.amount === 'number' ? bid.amount.toLocaleString() : '0'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Bid placed on{" "}
                                  {new Date(bid.createdAt).toLocaleDateString()}
                                </span>
                              </div>

                              {/* Bid Status */}
                              <Badge
                                variant={getBadgeVariant(bid.status)}
                                className="mt-2"
                              >
                                {bid.status.charAt(0).toUpperCase() +
                                  bid.status.slice(1)}
                              </Badge>
                            </div>

                            {/* Action Buttons */}
                            {bid.status === "pending" &&
                              user?._id === event.userId && (
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleBidAction(bid._id, "accepted")}
                                    variant="default"
                                    className="w-24"
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    onClick={() => handleBidAction(bid._id, "rejected")}
                                    variant="destructive"
                                    className="w-24"
                                  >
                                    Reject
                                  </Button>
                                </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-4 text-center text-muted-foreground">
                        No bids placed yet
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

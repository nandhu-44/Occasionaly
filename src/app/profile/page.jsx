"use client";
import { useUser } from "@/hooks/useUser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BiddingHistory from "@/components/BiddingHistory";

export default function ProfilePage() {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (user?.accountType === "vendor") {
      const fetchBids = async () => {
        try {
          const response = await fetch("/api/bids/vendor", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          setBids(data);
        } catch (error) {
          console.error("Failed to fetch bids:", error);
        }
      };
      fetchBids();
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-32 w-32">
              <Image
                src="/user-profile.svg"
                alt="Profile"
                fill
                className="rounded-full border-2 border-gray-200"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-500">{user.email}</p>

            <div className="mt-6 w-full space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <h2 className="mb-2 text-lg font-semibold">
                  Account Information
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Account Type:</span>{" "}
                    {user.accountType}
                  </p>
                  <p>
                    <span className="font-medium">Member Since:</span>{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                  <Link href="/events">
                    <Button variant="outline">View Events</Button>
                  </Link>
                  {user.accountType === "user" && (
                    <Link href="/create-event">
                      <Button>Create New Event</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {user.accountType === "vendor" && <BiddingHistory />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

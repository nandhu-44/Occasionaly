import React from "react";
import { Bell, Calendar, Mail, Server, Shield, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const PrivacyPolicy = () => {
    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="space-y-2 text-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight">
                    Privacy Policy
                </h1>
                <Badge className="text-muted-foreground" variant="secondary">
                    Last updated: {new Date().toLocaleDateString()}
                </Badge>
            </div>

            <div className="space-y-8">
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-semibold">
                            Information We Collect
                        </h2>
                    </div>
                    <p className="text-muted-foreground mb-4">
                        We collect information that you provide directly to us
                        when using our service, including:
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-medium">Account Details</h3>
                                <p className="text-sm text-muted-foreground">
                                    Username, email, and encrypted password
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-medium">
                                    Event Information
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Event details, attendee counts, preferences
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Server className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-medium">
                                    Service Listings
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Vendor services and bidding history
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-medium">Communications</h3>
                                <p className="text-sm text-muted-foreground">
                                    Contact form submissions and messages
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <p className="text-sm text-muted-foreground text-center">
                    For any privacy concerns, please{" "}
                    <Link
                        href="/contact-us"
                        className="text-primary hover:underline"
                    >
                        contact us
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default PrivacyPolicy;

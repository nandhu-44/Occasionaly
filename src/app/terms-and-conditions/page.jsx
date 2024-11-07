import React from "react";
import { Shield, Mail, User, Globe, Bell, Lock, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const TermsAndConditions = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div className="prose max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using Occasionaly, you agree to be bound by these Terms and Conditions and our Privacy Policy.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">2. User Accounts</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>You must register an account to use our services</li>
            <li>You can register as either a vendor or regular user</li>
            <li>You are responsible for maintaining your account security</li>
            <li>You must provide accurate and complete information</li>
            <li>You must be at least 18 years old to use our services</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. Event Creation and Bidding</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Users can create and manage event listings</li>
            <li>Vendors can submit bids on events</li>
            <li>All bids are binding once accepted</li>
            <li>Event creators can accept or reject bids</li>
            <li>We are not responsible for disputes between users and vendors</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">4. Prohibited Activities</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Creating false or misleading events</li>
            <li>Submitting fraudulent bids</li>
            <li>Harassing other users</li>
            <li>Violating any applicable laws</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">5. Modifications</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.</p>
        </section>
      </div>
    </main>
  );
};

export default function PrivacyPolicy() {
  const policies = [
    {
      icon: <User className="h-6 w-6 text-primary" />,
      title: "Personal Information",
      description: "Name, email address, and profile information provided during registration",
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Usage Data",
      description: "Information about how you interact with our services",
    },
    {
      icon: <Bell className="h-6 w-6 text-primary" />,
      title: "Communications",
      description: "Correspondence when you contact us for support",
    },
  ];

  return (
    <div className="container max-w-4xl py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">Privacy Policy</h1>
        <Badge className="text-muted-foreground" variant="secondary">
          Last updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Information We Collect</h2>
        </div>
        
        <p className="text-muted-foreground mb-6">
          We collect information that you provide directly to us when using our service.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {policies.map((policy, index) => (
            <div key={index} className="flex flex-col gap-3 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                {policy.icon}
                <h3 className="font-semibold">{policy.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{policy.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Data Protection</h2>
        </div>
        <p className="text-muted-foreground">
          Your data is protected using industry-standard encryption and security measures.
        </p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Contact Us</h2>
        </div>
        <p className="text-muted-foreground">
          If you have any questions about our privacy policy, please{' '}
          <Link href="/contact-us" className="text-primary hover:underline">
            contact us
          </Link>
          .
        </p>
      </Card>
    </div>
  );
}
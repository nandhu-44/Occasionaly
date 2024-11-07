"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/ui/card';
import { BidCard } from '@/components/ui/bid-card';
import { LoadingBids } from '@/components/loading-bids';

const BiddingHistory = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !user) return;

        const response = await fetch(`/api/bids/vendors/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        setBids(data.bids);
      } catch (error) {
        console.error('Failed to fetch bids:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [user]);

  const formatCurrency = (amount) => {
    return typeof amount === 'number' 
      ? amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      : '$0.00';
  };

  if (loading) {
    return (
      <div className="mt-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Bidding History</h2>
        <LoadingBids />
      </div>
    );
  }

  return (
    <div className="mt-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Bidding History</h2>
      {!bids || bids.length === 0 ? (
        <Card className="p-6">
          <p className="text-gray-500 text-center">No bidding history found.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {bids.map(bid => (
            <BidCard key={bid._id?.toString()} bid={bid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BiddingHistory;

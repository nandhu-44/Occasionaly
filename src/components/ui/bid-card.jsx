import { Card } from "./card";
import { BidStatusBadge } from "./bid-status-badge";

export const BidCard = ({ bid }) => {
  const formatCurrency = (amount) => {
    return typeof amount === 'number'
      ? amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      : '$0.00';
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">
            {bid.eventId?.title || 'Untitled Event'}
          </h3>
          <div className="flex items-center gap-4">
            <p className="font-medium text-primary">
              {formatCurrency(bid.amount)}
            </p>
            <BidStatusBadge status={bid.status} />
          </div>
        </div>
        <time className="text-sm text-muted-foreground whitespace-nowrap">
          {bid.createdAt ? new Date(bid.createdAt).toLocaleDateString() : 'No date'}
        </time>
      </div>
    </Card>
  );
};

import { cn } from "@/lib/utils";

export const BidStatusBadge = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    accepted: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-sm font-medium border",
      statusStyles[status?.toLowerCase()] || statusStyles.pending
    )}>
      {status || 'Pending'}
    </span>
  );
};

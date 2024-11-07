import { Card } from "./ui/card";

export const LoadingBids = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="flex gap-4">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

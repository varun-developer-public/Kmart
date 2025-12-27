export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-48 rounded-2xl mb-4"></div>
      <div className="space-y-3">
        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
        <div className="bg-gray-300 h-4 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md animate-pulse">
      <div className="bg-gray-300 aspect-square rounded-xl mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-300 h-4 rounded w-full"></div>
        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
        <div className="bg-gray-300 h-6 rounded w-1/2"></div>
      </div>
    </div>
  );
}

import { Star } from "lucide-react";

export default function StarRating({
  rating,
  size = "md",
  showNumber = false,
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? "fill-brutal-yellow stroke-brutal-black"
                : "fill-brutal-white stroke-brutal-black"
            } stroke-2`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`font-mono font-bold ${textSizes[size]} ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

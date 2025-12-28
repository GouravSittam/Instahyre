import { useState } from "react";
import { api } from "../api";
import {
  X,
  MapPin,
  Star,
  MessageSquare,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function AddReviewModal({
  onClose,
  onSuccess,
  prefillPlace = null,
}) {
  const [placeName, setPlaceName] = useState(prefillPlace?.name || "");
  const [placeAddress, setPlaceAddress] = useState(prefillPlace?.address || "");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (text.trim().length < 10) {
      setError("Review must be at least 10 characters");
      return;
    }

    setLoading(true);

    try {
      await api.addReview(placeName, placeAddress, rating, text.trim());
      setSuccess("Review submitted successfully!");
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-brutal-black/80 flex items-center justify-center p-4 z-50 animate-slide-in"
      onClick={onClose}
    >
      <div
        className="card-brutal bg-brutal-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6 pb-6 border-b-3 border-brutal-black">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-shadow-brutal mb-2">
              {prefillPlace ? "Leave a Review" : "Add New Review"}
            </h2>
            <p className="font-bold uppercase text-sm tracking-wide text-brutal-gray-600">
              Share your experience
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border-3 border-brutal-black bg-brutal-white
                                 hover:bg-brutal-red hover:text-brutal-white transition-colors"
          >
            <X className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-brutal-red border-3 border-brutal-black flex items-start gap-3 animate-bounce-brutal">
            <AlertCircle
              className="w-6 h-6 flex-shrink-0 text-brutal-white"
              strokeWidth={3}
            />
            <p className="font-bold text-brutal-white uppercase text-sm">
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-brutal-green border-3 border-brutal-black flex items-start gap-3 animate-bounce-brutal">
            <CheckCircle
              className="w-6 h-6 flex-shrink-0 text-brutal-white"
              strokeWidth={3}
            />
            <p className="font-bold text-brutal-white uppercase text-sm">
              {success}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-bold uppercase text-sm tracking-wider">
              <MapPin className="inline w-4 h-4 mr-2" strokeWidth={3} />
              Place Name *
            </label>
            <input
              type="text"
              className="input-brutal"
              placeholder="E.G., PIZZA PALACE"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              required
              disabled={!!prefillPlace}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold uppercase text-sm tracking-wider">
              <MapPin className="inline w-4 h-4 mr-2" strokeWidth={3} />
              Address *
            </label>
            <input
              type="text"
              className="input-brutal"
              placeholder="E.G., MG ROAD, BANGALORE"
              value={placeAddress}
              onChange={(e) => setPlaceAddress(e.target.value)}
              required
              disabled={!!prefillPlace}
            />
          </div>

          <div>
            <label className="block mb-3 font-bold uppercase text-sm tracking-wider">
              <Star className="inline w-4 h-4 mr-2" strokeWidth={3} />
              Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-all duration-200"
                >
                  <Star
                    className={`w-12 h-12 stroke-3 border-2 border-brutal-black ${
                      star <= (hoverRating || rating)
                        ? "fill-brutal-yellow stroke-brutal-black"
                        : "fill-brutal-white stroke-brutal-black"
                    } hover:scale-110 transition-transform`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <div className="mt-3 inline-block px-3 py-1 bg-brutal-yellow border-2 border-brutal-black">
                <span className="font-bold uppercase text-sm">
                  {rating} {rating === 1 ? "Star" : "Stars"}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 font-bold uppercase text-sm tracking-wider">
              <MessageSquare className="inline w-4 h-4 mr-2" strokeWidth={3} />
              Your Review * (Min 10 characters)
            </label>
            <textarea
              className="input-brutal min-h-[150px] resize-y"
              placeholder="SHARE YOUR EXPERIENCE..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              minLength={10}
            />
            <div className="mt-2 font-mono font-bold text-xs text-brutal-gray-600">
              {text.length} / 10 characters minimum
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-3 border-brutal-black">
            <button
              type="button"
              className="btn-brutal flex-1"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-brutal-primary flex-1"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

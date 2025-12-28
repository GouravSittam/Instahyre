import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import StarRating from "../components/StarRating";
import AddReviewModal from "../components/AddReviewModal";
import {
  ArrowLeft,
  MapPin,
  Star,
  MessageSquare,
  Calendar,
  Plus,
  Edit,
} from "lucide-react";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PlaceDetailsPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddReview, setShowAddReview] = useState(false);

  const fetchPlaceDetails = useCallback(async () => {
    try {
      const data = await api.getPlaceDetails(id);
      setPlace(data.place);
      setReviews(data.reviews);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPlaceDetails();
  }, [fetchPlaceDetails]);

  const handleReviewAdded = () => {
    setShowAddReview(false);
    fetchPlaceDetails();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner-brutal"></div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="min-h-screen">
        <div className="container-brutal section-brutal">
          <Link
            to="/"
            className="btn-brutal mb-6 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={3} />
            Back
          </Link>
          <div className="card-brutal bg-brutal-white text-center py-16">
            <MessageSquare
              className="w-24 h-24 mx-auto mb-6 text-brutal-red"
              strokeWidth={2}
            />
            <h3 className="text-3xl font-black uppercase mb-3">
              Place not found
            </h3>
            <p className="font-bold uppercase text-sm text-brutal-gray-600">
              {error || "This place does not exist."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const hasUserReview = reviews.some((r) => r.is_current_user);

  return (
    <div className="min-h-screen">
      <div className="container-brutal section-brutal">
        <Link to="/" className="btn-brutal mb-8 inline-flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" strokeWidth={3} />
          Back to Search
        </Link>

        {/* Place Header */}
        <div className="card-brutal bg-brutal-white mb-8 rotate-slight">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3 text-shadow-brutal">
              {place.name}
            </h1>
            <p className="flex items-center gap-2 font-mono font-bold text-lg text-brutal-gray-600">
              <MapPin className="w-5 h-5" strokeWidth={3} />
              {place.address}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t-3 border-brutal-black">
            <div className="p-4 bg-brutal-yellow border-3 border-brutal-black">
              <div className="flex items-center gap-2 mb-2">
                <Star
                  className="w-6 h-6 fill-brutal-black stroke-brutal-black"
                  strokeWidth={3}
                />
                <span className="text-3xl font-black">
                  {place.average_rating > 0
                    ? place.average_rating.toFixed(1)
                    : "N/A"}
                </span>
              </div>
              <span className="font-bold uppercase text-xs tracking-wider">
                Average Rating
              </span>
            </div>
            <div className="p-4 bg-brutal-white border-3 border-brutal-black">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-6 h-6" strokeWidth={3} />
                <span className="text-3xl font-black">
                  {place.review_count}
                </span>
              </div>
              <span className="font-bold uppercase text-xs tracking-wider">
                Review{place.review_count !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-shadow-brutal">
              Reviews
            </h2>
            <button
              className="btn-brutal-accent flex items-center gap-2"
              onClick={() => setShowAddReview(true)}
            >
              {hasUserReview ? (
                <>
                  <Edit className="w-5 h-5" strokeWidth={3} />
                  Edit Review
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" strokeWidth={3} />
                  Add Review
                </>
              )}
            </button>
          </div>

          {reviews.length === 0 ? (
            <div className="card-brutal bg-brutal-white text-center py-16">
              <MessageSquare
                className="w-24 h-24 mx-auto mb-6 text-brutal-gray-400"
                strokeWidth={2}
              />
              <h3 className="text-3xl font-black uppercase mb-3">
                No reviews yet
              </h3>
              <p className="font-bold uppercase text-sm text-brutal-gray-600">
                Be the first to review this place!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`card-brutal ${
                    review.is_current_user
                      ? "bg-brutal-yellow border-5"
                      : "bg-brutal-white"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-brutal-black border-3 border-brutal-black flex items-center justify-center">
                        <span className="text-brutal-yellow font-black text-xl">
                          {review.user_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="font-black uppercase text-lg block">
                          {review.user_name}
                        </span>
                        {review.is_current_user && (
                          <span className="badge-brutal bg-brutal-red text-brutal-white border-brutal-black">
                            Your Review
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-mono font-bold text-sm">
                      <Calendar className="w-4 h-4" strokeWidth={3} />
                      {formatDate(review.created_at)}
                    </div>
                  </div>

                  <div className="mb-4">
                    <StarRating rating={review.rating} size="sm" />
                  </div>

                  <p className="font-mono font-bold text-base leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Review Modal */}
      {showAddReview && (
        <AddReviewModal
          onClose={() => setShowAddReview(false)}
          onSuccess={handleReviewAdded}
          prefillPlace={place}
        />
      )}
    </div>
  );
}

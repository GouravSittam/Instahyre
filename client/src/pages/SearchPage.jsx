import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import StarRating from "../components/StarRating";
import AddReviewModal from "../components/AddReviewModal";
import { Search, Plus, Store, Filter } from "lucide-react";

export default function SearchPage() {
  // Component state - managing search and results
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [minRating, setMinRating] = useState("");
  const [showAddReview, setShowAddReview] = useState(false);

  const navigate = useNavigate();

  // useCallback to prevent unnecessary re-renders
  const fetchPlaces = useCallback(
    async (name = searchName, rating = minRating) => {
      setLoading(true);
      try {
        const data = await api.searchPlaces(name, rating);
        setPlaces(data.places);
        console.log(`Loaded ${data.places.length} places`); // debug log
      } catch (err) {
        console.error("Search error:", err);
        // TODO: Add user-friendly error message
      } finally {
        setLoading(false);
      }
    },
    [searchName, minRating]
  );

  useEffect(() => {
    fetchPlaces("", "");
  }, [fetchPlaces]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPlaces();
  };

  const handlePlaceClick = (placeId) => {
    navigate(`/places/${placeId}`);
  };

  const handleReviewAdded = () => {
    setShowAddReview(false);
    fetchPlaces();
  };

  return (
    <div className="min-h-screen">
      <div className="container-brutal section-brutal">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-slide-in">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-3 text-shadow-brutal relative inline-block">
              <span className="relative z-10">Discover Places</span>
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-brutal-red -rotate-1 -z-10"></span>
            </h1>
            <p className="text-lg md:text-xl font-bold uppercase tracking-wide flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-brutal-red animate-pulse"></span>
              Find the best spots around
            </p>
          </div>
          <button
            className="btn-brutal-accent flex items-center gap-2 animate-bounce-brutal"
            onClick={() => setShowAddReview(true)}
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
            Add Review
          </button>
        </div>

        {/* Search Form */}
        <div className="card-brutal mb-8 bg-brutal-white animate-slide-in-up">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block mb-2 font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                  <Search className="inline w-4 h-4" strokeWidth={3} />
                  Search by Name
                </label>
                <input
                  type="text"
                  className="input-brutal"
                  placeholder="RESTAURANT, SHOP, DOCTOR..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>

              <div className="relative">
                <label className="block mb-2 font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                  <Filter className="inline w-4 h-4" strokeWidth={3} />
                  Min Rating
                </label>
                <select
                  className="input-brutal cursor-pointer"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                >
                  <option value="">ANY RATING</option>
                  <option value="1">1+ ★</option>
                  <option value="2">2+ ★★</option>
                  <option value="3">3+ ★★★</option>
                  <option value="4">4+ ★★★★</option>
                  <option value="4.5">4.5+ ★★★★★</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn-brutal-primary w-full sm:w-auto text-lg"
            >
              <Search className="inline w-5 h-5 mr-2" strokeWidth={3} />
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner-brutal"></div>
          </div>
        ) : places.length === 0 ? (
          <div className="card-brutal bg-brutal-white text-center py-16">
            <Store
              className="w-24 h-24 mx-auto mb-6 text-brutal-gray-400"
              strokeWidth={2}
            />
            <h3 className="text-3xl font-black uppercase mb-3">
              No places found
            </h3>
            <p className="font-bold uppercase text-sm text-brutal-gray-600">
              Try a different search or be the first to review!
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6 p-4 bg-brutal-black text-brutal-yellow border-5 border-brutal-black inline-block shadow-brutal animate-pulse-shadow">
              <span className="font-bold uppercase text-sm tracking-wider">
                🎯 Found {places.length} place{places.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid-brutal">
              {places.map((place, index) => (
                <div
                  key={place.id}
                  className="card-brutal-hover bg-brutal-white cursor-pointer group"
                  onClick={() => handlePlaceClick(place.id)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-black uppercase mb-2 group-hover:text-brutal-red transition-colors">
                      {place.name}
                    </h3>
                    <p className="font-mono font-bold text-sm text-brutal-gray-600 uppercase">
                      📍 {place.address}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t-3 border-brutal-black">
                    <StarRating
                      rating={place.average_rating}
                      showNumber={true}
                    />
                    <span className="badge-brutal">
                      {place.review_count} review
                      {place.review_count !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {showAddReview && (
        <AddReviewModal
          onClose={() => setShowAddReview(false)}
          onSuccess={handleReviewAdded}
        />
      )}
    </div>
  );
}

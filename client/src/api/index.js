const API_BASE = "/api";

// API service class to handle all backend requests
class ApiService {
  constructor() {
    this.baseUrl = API_BASE;
    this.onUnauthorized = null; // callback for handling auth failures
  }

  setUnauthorizedHandler(handler) {
    this.onUnauthorized = handler;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  // Generic request handler - all API calls go through this
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken();

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Check if response has content
      const contentType = response.headers.get("content-type");
      const hasJson = contentType && contentType.includes("application/json");

      let data = null;
      if (hasJson && response.status !== 204) {
        const text = await response.text();
        data = text ? JSON.parse(text) : null;
      }

      // Handle unauthorized/forbidden errors
      if (response.status === 401 || response.status === 403) {
        // Clear invalid token from storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Call logout handler if set (triggers app-wide logout)
        if (this.onUnauthorized) {
          this.onUnauthorized();
        }

        throw new Error(data?.error || "Session expired. Please login again.");
      }

      if (!response.ok) {
        throw new Error(
          data?.error || `Request failed with status ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  // Auth endpoints
  async register(name, phoneNumber, password) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, phone_number: phoneNumber, password }),
    });
  }

  async login(phoneNumber, password) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ phone_number: phoneNumber, password }),
    });
  }

  async getProfile() {
    return this.request("/auth/profile");
  }

  // Places endpoints
  async searchPlaces(name = "", minRating = "") {
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (minRating) params.append("min_rating", minRating);
    return this.request(`/places/search?${params.toString()}`);
  }

  async getPlaceDetails(id) {
    return this.request(`/places/${id}`);
  }

  // Reviews endpoints
  async addReview(placeName, placeAddress, rating, text) {
    return this.request("/reviews", {
      method: "POST",
      body: JSON.stringify({
        place_name: placeName,
        place_address: placeAddress,
        rating,
        text,
      }),
    });
  }

  async getMyReviews() {
    return this.request("/reviews/my-reviews");
  }
}

export const api = new ApiService();

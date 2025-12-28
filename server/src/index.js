/**
 * PlaceReview API Server
 * Author: Gourav Chaudhary
 * Express.js REST API for place reviews and ratings
 */
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Ensure data directory exists
const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const { initializeDatabase } = require("./config/database");
const authRoutes = require("./routes/auth");
const placeRoutes = require("./routes/places");
const reviewRoutes = require("./routes/reviews");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Middleware setup
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Initialize database and start server
const startServer = async () => {
  await initializeDatabase();

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/places", placeRoutes);
  app.use("/api/reviews", reviewRoutes);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
  });

  // Error handler
  app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Available endpoints:");
    console.log("  POST /api/auth/register - Register new user");
    console.log("  POST /api/auth/login    - Login user");
    console.log("  GET  /api/auth/profile  - Get user profile");
    console.log("  POST /api/reviews       - Add/update review");
    console.log("  GET  /api/reviews/my-reviews - Get user reviews");
    console.log("  GET  /api/places/search - Search places");
    console.log("  GET  /api/places/:id    - Get place details");
  });
};

startServer().catch(console.error);

module.exports = app;

const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { addReview, getUserReviews } = require('../controllers/reviewController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Add or update a review
router.post('/', addReview);

// Get current user's reviews
router.get('/my-reviews', getUserReviews);

module.exports = router;

const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { searchPlaces, getPlaceDetails } = require('../controllers/placeController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Search places
router.get('/search', searchPlaces);

// Get place details
router.get('/:id', getPlaceDetails);

module.exports = router;

const { runQuery, getOne, getAll, saveDatabase } = require('../config/database');

const addReview = (req, res) => {
    try {
        const { place_name, place_address, rating, text } = req.body;
        const userId = req.user.id;

        // Validation
        if (!place_name || !place_address || !rating || !text) {
            return res.status(400).json({
                error: 'Place name, address, rating, and review text are required.'
            });
        }

        const ratingNum = parseInt(rating);
        if (ratingNum < 1 || ratingNum > 5 || isNaN(ratingNum)) {
            return res.status(400).json({ error: 'Rating must be an integer between 1 and 5.' });
        }

        if (text.trim().length < 10) {
            return res.status(400).json({ error: 'Review text must be at least 10 characters.' });
        }

        // Check if place exists, create if not
        let place = getOne(
            'SELECT id FROM places WHERE name = ? AND address = ?',
            [place_name, place_address]
        );

        if (!place) {
            const placeResult = runQuery(
                'INSERT INTO places (name, address) VALUES (?, ?)',
                [place_name, place_address]
            );
            place = { id: placeResult.lastInsertRowid };
        }

        // Check if user already reviewed this place
        const existingReview = getOne(
            'SELECT id FROM reviews WHERE place_id = ? AND user_id = ?',
            [place.id, userId]
        );

        let review;
        let isUpdate = false;

        if (existingReview) {
            // Update existing review
            runQuery(
                'UPDATE reviews SET rating = ?, text = ?, created_at = CURRENT_TIMESTAMP WHERE id = ?',
                [ratingNum, text.trim(), existingReview.id]
            );
            review = getOne('SELECT * FROM reviews WHERE id = ?', [existingReview.id]);
            isUpdate = true;
        } else {
            // Insert new review
            const reviewResult = runQuery(
                'INSERT INTO reviews (place_id, user_id, rating, text) VALUES (?, ?, ?, ?)',
                [place.id, userId, ratingNum, text.trim()]
            );
            review = getOne('SELECT * FROM reviews WHERE id = ?', [reviewResult.lastInsertRowid]);
        }

        res.status(isUpdate ? 200 : 201).json({
            message: isUpdate ? 'Review updated successfully' : 'Review added successfully',
            review: {
                id: review.id,
                place_id: place.id,
                place_name,
                place_address,
                rating: review.rating,
                text: review.text,
                created_at: review.created_at
            }
        });
    } catch (error) {
        console.error('Add review error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getUserReviews = (req, res) => {
    try {
        const userId = req.user.id;

        const reviews = getAll(`
      SELECT 
        r.id,
        r.rating,
        r.text,
        r.created_at,
        p.id as place_id,
        p.name as place_name,
        p.address as place_address
      FROM reviews r
      JOIN places p ON r.place_id = p.id
      WHERE r.user_id = ?
      ORDER BY r.created_at DESC
    `, [userId]);

        res.json({ reviews });
    } catch (error) {
        console.error('Get user reviews error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { addReview, getUserReviews };

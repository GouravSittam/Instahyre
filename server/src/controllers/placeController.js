const { getOne, getAll } = require('../config/database');

const searchPlaces = (req, res) => {
    try {
        const { name, min_rating } = req.query;

        let query = `
      SELECT 
        p.id,
        p.name,
        p.address,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(r.id) as review_count
      FROM places p
      LEFT JOIN reviews r ON p.id = r.place_id
    `;

        const conditions = [];
        const params = [];

        // Filter by name if provided
        if (name && name.trim()) {
            conditions.push('p.name LIKE ?');
            params.push(`%${name.trim()}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' GROUP BY p.id';

        // Filter by minimum average rating if provided
        if (min_rating && !isNaN(parseFloat(min_rating))) {
            const minRatingValue = parseFloat(min_rating);
            if (minRatingValue >= 1 && minRatingValue <= 5) {
                query += ` HAVING average_rating >= ${minRatingValue}`;
            }
        }

        // Order: exact matches first, then partial matches, then by rating
        if (name && name.trim()) {
            query += `
        ORDER BY 
          CASE WHEN LOWER(p.name) = LOWER(?) THEN 0 ELSE 1 END,
          average_rating DESC,
          p.name ASC
      `;
            params.push(name.trim());
        } else {
            query += ' ORDER BY average_rating DESC, p.name ASC';
        }

        const places = getAll(query, params);

        // Round average rating to 1 decimal place
        const formattedPlaces = places.map(place => ({
            ...place,
            average_rating: Math.round(place.average_rating * 10) / 10
        }));

        res.json({
            places: formattedPlaces,
            total: formattedPlaces.length
        });
    } catch (error) {
        console.error('Search places error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getPlaceDetails = (req, res) => {
    try {
        const { id } = req.params;
        const currentUserId = req.user.id;

        // Get place details
        const place = getOne(`
      SELECT 
        p.id,
        p.name,
        p.address,
        p.created_at,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(r.id) as review_count
      FROM places p
      LEFT JOIN reviews r ON p.id = r.place_id
      WHERE p.id = ?
      GROUP BY p.id
    `, [parseInt(id)]);

        if (!place) {
            return res.status(404).json({ error: 'Place not found.' });
        }

        // Get all reviews for this place
        // Current user's review first, then others sorted by newest
        const reviews = getAll(`
      SELECT 
        r.id,
        r.rating,
        r.text,
        r.created_at,
        r.user_id,
        u.name as user_name,
        CASE WHEN r.user_id = ? THEN 1 ELSE 0 END as is_current_user
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.place_id = ?
      ORDER BY 
        CASE WHEN r.user_id = ? THEN 0 ELSE 1 END,
        r.created_at DESC
    `, [currentUserId, parseInt(id), currentUserId]);

        res.json({
            place: {
                id: place.id,
                name: place.name,
                address: place.address,
                created_at: place.created_at,
                average_rating: Math.round(place.average_rating * 10) / 10,
                review_count: place.review_count
            },
            reviews: reviews.map(r => ({
                id: r.id,
                rating: r.rating,
                text: r.text,
                created_at: r.created_at,
                user_name: r.user_name,
                is_current_user: r.is_current_user === 1
            }))
        });
    } catch (error) {
        console.error('Get place details error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { searchPlaces, getPlaceDetails };

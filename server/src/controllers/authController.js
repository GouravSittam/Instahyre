const bcrypt = require('bcryptjs');
const { runQuery, getOne } = require('../config/database');
const { generateToken } = require('../middleware/auth');

const register = async (req, res) => {
    try {
        const { name, phone_number, password } = req.body;

        // Validation
        if (!name || !phone_number || !password) {
            return res.status(400).json({ error: 'Name, phone number, and password are required.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters.' });
        }

        // Check if phone number already exists
        const existingUser = getOne('SELECT id FROM users WHERE phone_number = ?', [phone_number]);
        if (existingUser) {
            return res.status(409).json({ error: 'Phone number already registered.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const result = runQuery(
            'INSERT INTO users (name, phone_number, password) VALUES (?, ?, ?)',
            [name, phone_number, hashedPassword]
        );

        const user = { id: result.lastInsertRowid, name, phone_number };
        const token = generateToken(user);

        res.status(201).json({
            message: 'Registration successful',
            user: { id: user.id, name: user.name, phone_number: user.phone_number },
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const login = async (req, res) => {
    try {
        const { phone_number, password } = req.body;

        // Validation
        if (!phone_number || !password) {
            return res.status(400).json({ error: 'Phone number and password are required.' });
        }

        // Find user
        const user = getOne('SELECT * FROM users WHERE phone_number = ?', [phone_number]);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            user: { id: user.id, name: user.name, phone_number: user.phone_number },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getProfile = (req, res) => {
    try {
        const user = getOne(
            'SELECT id, name, phone_number, created_at FROM users WHERE id = ?',
            [req.user.id]
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { register, login, getProfile };

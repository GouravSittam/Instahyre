const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const { initializeDatabase, runQuery, exec, getAll } = require('../src/config/database');

// Sample data
const userNames = [
    'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Gupta', 'Vikram Singh',
    'Anjali Verma', 'Rohit Joshi', 'Neha Agarwal', 'Karan Mehta', 'Pooja Reddy',
    'Arjun Nair', 'Divya Krishnan', 'Sanjay Rao', 'Meera Iyer', 'Raj Malhotra',
    'Kavita Desai', 'Nikhil Saxena', 'Swati Pandey', 'Arun Chatterjee', 'Ritu Bose'
];

const placeTypes = [
    { type: 'Restaurant', names: ['Spice Garden', 'The Curry House', 'Masala Magic', 'Tandoori Nights', 'Biryani Palace', 'Pizza Paradise', 'Burger Barn', 'Sushi Station'] },
    { type: 'Doctor', names: ['Dr. Kapoor Clinic', 'City Health Center', 'Wellness Medical', 'Care Plus Hospital', 'LifeLine Diagnostics', 'Apollo Clinic'] },
    { type: 'Shop', names: ['Fashion Hub', 'Electronics World', 'Book Corner', 'Sports Zone', 'Home Essentials', 'Tech Gadgets', 'Style Street'] },
    { type: 'Salon', names: ['Glamour Studio', 'Cut & Style', 'Beauty Bliss', 'Hair Affair', 'The Grooming Room'] },
    { type: 'Gym', names: ['FitZone', 'PowerHouse Gym', 'CrossFit Arena', 'Muscle Factory', 'Yoga & Beyond'] }
];

const addresses = [
    'MG Road, Bangalore', 'Koramangala, Bangalore', 'Indiranagar, Bangalore',
    'Whitefield, Bangalore', 'HSR Layout, Bangalore', 'JP Nagar, Bangalore',
    'Marathahalli, Bangalore', 'Electronic City, Bangalore', 'Jayanagar, Bangalore',
    'Malleshwaram, Bangalore', 'BTM Layout, Bangalore', 'Rajajinagar, Bangalore'
];

const reviewTexts = [
    'Excellent service and great experience. Highly recommend this place to everyone!',
    'Good quality but a bit pricey. Overall satisfied with my visit.',
    'Average experience. Nothing special but not bad either.',
    'Amazing place! Will definitely come back again. Staff was very friendly.',
    'Disappointed with the service. Expected better based on reviews.',
    'Best in the area! Top-notch quality and professional staff.',
    'Nice ambiance and courteous staff. Food was delicious.',
    'Could be better. The waiting time was too long.',
    'Fantastic experience from start to finish. Five stars!',
    'Decent place for the price. Worth a visit if you are nearby.',
    'Not impressed. The place needs improvement in many areas.',
    'Wonderful! Everything exceeded my expectations.',
    'Pretty good overall. Minor issues but nothing major.',
    'Outstanding service! The staff went above and beyond.',
    'Just okay. Had higher expectations based on the ratings.'
];

async function seedDatabase() {
    console.log('Starting database seed...\n');

    // Initialize database schema
    await initializeDatabase();

    // Clear existing data
    console.log('Clearing existing data...');
    exec('DELETE FROM reviews');
    exec('DELETE FROM places');
    exec('DELETE FROM users');

    // Create users
    console.log('Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = [];
    for (let i = 0; i < userNames.length; i++) {
        const phoneNumber = `98${String(i).padStart(8, '0')}${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;
        const result = runQuery(
            'INSERT INTO users (name, phone_number, password) VALUES (?, ?, ?)',
            [userNames[i], phoneNumber, hashedPassword]
        );
        users.push({ id: result.lastInsertRowid, name: userNames[i], phone: phoneNumber });
    }
    console.log(`  Created ${users.length} users`);

    // Create places
    console.log('Creating places...');
    const places = [];
    for (const category of placeTypes) {
        for (const name of category.names) {
            const address = addresses[Math.floor(Math.random() * addresses.length)];
            try {
                const result = runQuery(
                    'INSERT INTO places (name, address) VALUES (?, ?)',
                    [name, address]
                );
                places.push({ id: result.lastInsertRowid, name, address, type: category.type });
            } catch (e) {
                // Skip if unique constraint fails (same name+address)
            }
        }
    }
    console.log(`  Created ${places.length} places`);

    // Create reviews
    console.log('Creating reviews...');
    let reviewCount = 0;
    const usedCombinations = new Set();

    // Each place gets between 3-10 random reviews
    for (const place of places) {
        const numReviews = 3 + Math.floor(Math.random() * 8);
        const shuffledUsers = [...users].sort(() => Math.random() - 0.5).slice(0, numReviews);

        for (const user of shuffledUsers) {
            const combination = `${place.id}-${user.id}`;
            if (usedCombinations.has(combination)) continue;
            usedCombinations.add(combination);

            const rating = Math.floor(Math.random() * 5) + 1;
            const text = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];

            try {
                runQuery(
                    'INSERT INTO reviews (place_id, user_id, rating, text) VALUES (?, ?, ?, ?)',
                    [place.id, user.id, rating, text]
                );
                reviewCount++;
            } catch (e) {
                // Skip if unique constraint fails
            }
        }
    }
    console.log(`  Created ${reviewCount} reviews`);

    // Summary
    console.log('\n=== Seed Complete ===');
    console.log(`Users: ${users.length}`);
    console.log(`Places: ${places.length}`);
    console.log(`Reviews: ${reviewCount}`);

    console.log('\n=== Sample Login Credentials ===');
    console.log('All users have password: password123');
    console.log('Sample phone numbers:');
    users.slice(0, 5).forEach(u => {
        console.log(`  ${u.name}: ${u.phone}`);
    });
}

seedDatabase().catch(console.error);

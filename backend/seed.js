const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');

dotenv.config();

const seedUsers = async () => {
    try {
        await connectDB();

        // Clear existing users
        await User.deleteMany();
        console.log('Existing users cleared.');

        const users = [
            {
                name: 'Alex Johnson',
                email: 'alex@example.com',
                password: 'password123',
            },
            {
                name: 'Sarah Smith',
                email: 'sarah@example.com',
                password: 'password123',
            },
        ];

        await User.create(users);
        console.log('Sample users seeded successfully!');

        process.exit();
    } catch (error) {
        console.error(`Error with seeding: ${error.message}`);
        process.exit(1);
    }
};

seedUsers();

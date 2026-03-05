const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Requires a MONGO_URI string in the .env file.
        // E.g., MONGO_URI=mongodb://127.0.0.1:27017/ai_health_bot
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;

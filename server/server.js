// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const sessionRoutes = require('./routes/session');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // React app URL
  credentials: true // Allow cookies
}));
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Rocket Elevators API' });
});

// Session routes
app.use('/session', sessionRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
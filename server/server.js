const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();


const sessionRoutes = require('./routes/session');
const transactionRoutes = require('./routes/transaction');
const agentRoutes = require('./routes/agent');

const app = express();

// Middleware - ORDER IS CRITICAL
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL]
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Rocket Elevators API' });
});

// Routes
app.use('/session', sessionRoutes);
app.use('/', transactionRoutes);
app.use('/', agentRoutes);

// MongoDB connection
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    const existing = await User.findOne({ email: 'demo@rocketelevators.com' });
    if (!existing) {
      const hashed = await bcrypt.hash('password123', 10);
      await User.create({
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@rocketelevators.com',
        password: hashed
      });
      console.log('✅ Demo user seeded');
    }
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
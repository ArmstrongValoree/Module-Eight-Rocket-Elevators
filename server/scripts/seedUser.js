const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function seedUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if demo user already exists
    const existingUser = await User.findOne({ email: 'demo@rocketelevators.com' });
    
    if (existingUser) {
      console.log('ℹ️  Demo user already exists');
      console.log('Email:', existingUser.email);
      console.log('User ID:', existingUser._id);
    } else {
      // Create demo user
      const demoUser = new User({
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@rocketelevators.com',
        password: 'password123'  // Plain text for demo - NOT production ready!
      });

      await demoUser.save();
      console.log('✅ Demo user created successfully!');
      console.log('Email:', demoUser.email);
      console.log('Password: password123');
      console.log('User ID:', demoUser._id);
    }

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding user:', error);
    process.exit(1);
  }
}

seedUser();
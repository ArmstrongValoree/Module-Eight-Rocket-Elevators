const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  region: {
    type: String,
    required: true,
    enum: ['North', 'South', 'East', 'West']
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  fee: {
    type: Number,
    required: true,
    min: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
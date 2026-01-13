const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  session_token: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    expires: 86400  // TTL: 24 hours in seconds
  }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
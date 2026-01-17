const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
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

    // Use a dedicated TTL field that updates when the session updates
    last_updated: {
      type: Date,
      default: Date.now,
      expires: 86400 // 24 hours
    }
  },
  {
    timestamps: true,     // adds createdAt + updatedAt
    autoIndex: true       // ensures TTL index is created in dev
  }
);

// Automatically refresh TTL timer on save/update
sessionSchema.pre('save', function (next) {
  this.last_updated = Date.now();
  next();
});

sessionSchema.pre('findOneAndUpdate', function (next) {
  this.set({ last_updated: Date.now() });
  next();
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;

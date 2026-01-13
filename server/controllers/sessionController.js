const { v4: uuidv4 } = require('uuid');
const Session = require('../models/Session');
const User = require('../models/User');

// POST /session - Create new session (login)
exports.createSession = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        data: null,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        data: null,
        message: 'Invalid email or password'
      });
    }

    // Check password (plain text comparison for demo - NOT production ready!)
    if (user.password !== password) {
      return res.status(401).json({
        status: 'error',
        data: null,
        message: 'Invalid email or password'
      });
    }

    // Generate session token
    const sessionToken = uuidv4();

    // Create session in database
    const session = new Session({
      session_token: sessionToken,
      user_id: user._id
    });

    await session.save();

    // Return success with token
    res.status(200).json({
      status: 'ok',
      data: {
        token: sessionToken,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      },
      message: 'Session created successfully'
    });

  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({
      status: 'error',
      data: null,
      message: 'Failed to create session'
    });
  }
};

// GET /validate_token - Validate existing session
exports.validateToken = async (req, res) => {
  try {
    const { token } = req.query;

    // Validate input
    if (!token) {
      return res.status(400).json({
        status: 'error',
        data: { valid: false },
        message: 'Token is required'
      });
    }

    // Find session in database
    const session = await Session.findOne({ session_token: token }).populate('user_id');

    if (!session) {
      return res.status(404).json({
        status: 'error',
        data: { valid: false },
        message: 'Invalid or expired session'
      });
    }

    // Return success with user info
    res.status(200).json({
      status: 'ok',
      data: {
        valid: true,
        user: {
          id: session.user_id._id,
          firstName: session.user_id.firstName,
          lastName: session.user_id.lastName,
          email: session.user_id.email
        }
      },
      message: null
    });

  } catch (error) {
    console.error('Validate token error:', error);
    res.status(500).json({
      status: 'error',
      data: { valid: false },
      message: 'Failed to validate token'
    });
  }
};
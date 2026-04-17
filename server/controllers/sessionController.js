const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const Session = require('../models/Session');
const User = require('../models/User');

exports.createSession = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        data: null,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        data: null,
        message: 'Invalid email or password'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: 'error',
        data: null,
        message: 'Invalid email or password'
      });
    }

    const sessionToken = uuidv4();

    const session = new Session({
      session_token: sessionToken,
      user_id: user._id
    });

    await session.save();

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

exports.validateToken = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        status: 'error',
        data: { valid: false },
        message: 'Token is required'
      });
    }

    const session = await Session.findOne({ session_token: token }).populate('user_id');

    if (!session) {
      return res.status(404).json({
        status: 'error',
        data: { valid: false },
        message: 'Invalid or expired session'
      });
    }

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

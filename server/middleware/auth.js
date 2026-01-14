const Session = require('../models/Session');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.session_token;
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        data: null,
        message: 'Authentication required'
      });
    }

    const session = await Session.findOne({ session_token: token }).populate('user_id');
    
    if (!session) {
      return res.status(401).json({
        status: 'error',
        data: null,
        message: 'Invalid or expired session'
      });
    }

    req.user = session.user_id;
    next();
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: null,
      message: 'Authentication failed'
    });
  }
};

module.exports = authenticate;
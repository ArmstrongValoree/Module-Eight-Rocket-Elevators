const Agent = require('../models/Agent');

exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent
      .find()
      .select('first_name last_name email region rating fee')
      .sort({ last_name: 1, first_name: 1 });

    res.status(200).json({
      status: 'ok',
      data: agents,
      message: null
    });
  } catch (error) {
    console.error('Get agents error:', error);
    res.status(500).json({
      status: 'error',
      data: null,
      message: 'Failed to fetch agents'
    });
  }
};
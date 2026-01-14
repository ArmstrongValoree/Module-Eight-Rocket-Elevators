const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

router.get('/agents', agentController.getAllAgents);

module.exports = router;
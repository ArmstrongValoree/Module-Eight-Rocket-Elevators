const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

router.get('/agents', agentController.getAllAgents);
router.put('/agents/:id', agentController.updateAgent);
router.delete('/agents/:id', agentController.deleteAgent);

module.exports = router;
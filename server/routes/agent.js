const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const authenticate = require('../middleware/auth');

router.get('/agents', authenticate, agentController.getAllAgents);
router.post('/agents', authenticate, agentController.createAgent);
router.put('/agents/:id', authenticate, agentController.updateAgent);
router.delete('/agents/:id', authenticate, agentController.deleteAgent);

module.exports = router;
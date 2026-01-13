const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// POST /session - Create new session (login)
router.post('/', sessionController.createSession);

// GET /validate_token - Validate session token
router.get('/validate_token', sessionController.validateToken);

module.exports = router;
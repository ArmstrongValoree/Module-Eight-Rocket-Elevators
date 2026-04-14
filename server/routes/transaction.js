const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticate = require('../middleware/auth');

router.get('/transaction-data', authenticate, transactionController.getTransactions);
router.post('/transaction', authenticate, transactionController.createTransaction);
router.delete('/transaction/:id', authenticate, transactionController.deleteTransaction);

module.exports = router;
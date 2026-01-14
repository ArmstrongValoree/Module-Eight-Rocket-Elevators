const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/transaction-data', transactionController.getTransactions);
router.post('/transaction', transactionController.createTransaction);

module.exports = router;
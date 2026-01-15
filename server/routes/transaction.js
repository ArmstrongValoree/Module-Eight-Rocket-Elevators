const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/transaction-data', transactionController.getTransactions);
router.post('/transaction', transactionController.createTransaction);
router.delete('/transaction/:id', transactionController.deleteTransaction);

module.exports = router;
// src/routes/transactions.ts
const express = require('express');
const router = express.Router(); 
import { requireAuth } from '../auth/requireAuth';
import { 
    createTransaction,
    deleteTransaction, 
    getAllTransactions,
    getTransaction,
    updateTransaction,
} from '../controllers/TransactionController';

// Route to create a new transaction associated with a user
router.post('/create', requireAuth, createTransaction);
router.get('/', requireAuth, getAllTransactions);
router.get('/:id', requireAuth, getTransaction);
router.put('/:id', requireAuth, updateTransaction);
router.delete('/:id', requireAuth, deleteTransaction);

module.exports = router;
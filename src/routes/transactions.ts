// src/routes/transactions.ts
import { Router } from 'express';
import { 
    createTransaction,
    deleteTransaction, 
    getAllTransactions,
    getTransaction,
    updateTransaction,
} from '../controllers/TransactionController';

const router = Router();

// Route to create a new transaction associated with a user
router.post('/transactions/create', createTransaction);
router.get('/transactions', getAllTransactions);
router.get('/transactions/:id', getTransaction);
router.put('/transaction/:id', updateTransaction);
router.delete('/transaction/:id', deleteTransaction);

export default router;
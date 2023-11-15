import {Request, Response} from 'express';
import {query} from '../db/db';

export const createTransaction = async (req: Request, res: Response) => {
    const {name, price, status} = req.body;
    const user_id = (req as any).user.userId;

    try {

        const result = await query('INSERT INTO transactions (name, price, status, user_id ) VALUES ($1, $2, $3, $4) RETURNING *', [name, price, status, user_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({message: 'Internal server error'});
    } 
}

export const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const { rows } = await query('SELECT * FROM transactions', []);
        res.json(rows);
    } catch (error) {
        console.error('Error getting transactions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getTransaction = async (req: Request, res: Response) => {
    const transactionId = req.params.transactionId;
    try {
        const { rows } = await query('SELECT * FROM transactions WHERE id = $1', [transactionId]);

        if(rows.length === 0){
            res.status(404).json({message: 'Transaction not found'});            
        }else{
            res.json(rows[0]);
        }
    } catch (error) {
        console.log('Error getting transactions', error);
        res.status(500).json({message: 'Internal server error'});        
    }
}

export const updateTransaction = async(req: Request, res: Response) => {
    const transactionId = req.params.id;
    const { name, price, status } = req.body;
    const updateTransactionQuery = `
    UPDATE transactions
    SET name = COALESCE($1, name),
        price = COALESCE($2, price),
        status = COALESCE($3, status)        
    WHERE id = $4
    RETURNING id, name, price, status;
  `;

    try {
        const result = await query(
           updateTransactionQuery , [name, price, status, transactionId]
        )

        if(result.rows.length === 0){
            res.status(404).json({message: 'Transaction not found'});
        }else{
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error updating transaction', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const deleteTransaction = async (req: Request, res: Response) => {
    const transactionId = req.params.id;
    const deleteTransactionQuery = `
        DELETE FROM transactions
        WHERE id = $1
        RETURNING *;
    `;
    if(!transactionId){
        res.status(404).json({ message: 'transaction not found' });
    }
    try {
        const result = await query(deleteTransactionQuery, [transactionId]);
        
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'transaction not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
import {Request, Response} from 'express';
import {query} from '../db/db';

export const createTransaction = async (req: Request, res: Response) => {
    const {name, price, status} = req.body;
    try {
        const result = await query('INSERT INTO transactions (name, price, status ) VALUES ($1, $2, $3) RETURNING *', [name, price, status]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({message: 'Internal server error'});
    } 
}

export const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const { rows } = await query('SELECT * FROM transaction', []);
        res.json(rows);
    } catch (error) {
        console.log(error)
    }
}

export const getTransaction = async (req: Request, res: Response) => {
    const transactionId = parseInt(req.params.transactionId);    
    try {
        const { rows } = await query('SELECT * FROM transactions WHERE id = $1', [transactionId]);

        if(rows.length === 0){
            res.status(404).json({message: 'Transaction not found'});            
        }else{
            res.json(rows[0]);
        }
    } catch (error) {
        console.log('Error getting user', error);
        res.status(500).json({message: 'Internal server error'});        
    }
}

export const updateTransaction = async(req: Request, res: Response) => {
    const transactionId = parseInt(req.params.id);
    const { name, price, status } = req.body;

    try {
        const result = await query(
           'UPDATE transaction SET name = $1, price = $2, status = $3' , [name, price, status, transactionId]
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
    try {
        const result = await query('DELETE FROM transaction WHERE id = $1 RETURNING *', []);
        
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
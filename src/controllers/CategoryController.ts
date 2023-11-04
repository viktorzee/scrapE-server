import {Request, Response} from 'express';
import {query} from '../db/db';

export const createCategory = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try {
      const result = await query('INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *', [name, description]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
      const { rows } = await query('SELECT * FROM categories', []);
      res.json(rows);
    } catch (error) {
      console.error('Error getting categories:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCategory = async (req: Request, res: Response) => {

}

export const updateCategory = async (req: Request, res: Response) => {

}

export const deleteCategory = async (req: Request, res: Response) => {

}
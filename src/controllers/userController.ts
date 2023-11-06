import {Request, Response} from 'express';
import {query} from '../db/db';
import bcrypt from 'bcrypt';
import { 
  validationResult, body
} from 'express-validator'
import { createToken } from '../auth/createToken'

export const validateRegistration = [
  body('phone_number').isLength({ min: 11 }).withMessage('Phone Number must be at least 11'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const register = async (req: Request, res: Response) => {
  //user reg validation
  // const errors = validationResult(req);

  // if(errors.isEmpty()){
  //   return res.status(400).json({errors: errors.array()});
  // }

  const { email, full_name, phone_number, password } = req.body;

  //hash user's password before storing to db
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Generate a random OTP (e.g., a 6-digit number)
  const otp = Math.floor(100000 + Math.random() * 900000);

  //create new userMethid

  try {
    const result = await query(
      'INSERT INTO users (full_name, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [full_name, email, phone_number, hashedPassword ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { phone_number, password } = req.body;

    // Query the database for the user's information
    const result = await query('SELECT id, password, phone_number, full_name, email FROM users WHERE phone_number = $1', [phone_number]);
    const user = result.rows[0];

    if (!user) {
      // User not found
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare the hashed password from the database with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Incorrect password
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Password is correct, generate a token and send it in the response
    const token = createToken(user);
    const userProfile = {...user, password: undefined}
    return res.status(200).json({ token, profile: userProfile });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { rows } = await query('SELECT * FROM users', []);
        res.json(rows);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    
}

export const getUser = async (req: Request, res: Response, id: string) => {
    const userId = parseInt(req.params.id);

    try {
      const { rows } = await query('SELECT * FROM users WHERE id = $1', [userId]);
  
      if (rows.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateUser =async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { email, full_name, phone_number, password, nin, bvn, account_number } = req.body;

    let hashedPassword: string | undefined;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }
  
    try { 
      const updateUserQuery = `
        UPDATE users
        SET full_name = COALESCE($1, full_name), email = COALESCE($2, email), password = COALESCE($3, password),
        phone_number = COALESCE($4, phone_number), nin = COALESCE($5, nin), bvn = COALESCE($6, bvn), account_number = COALESCE($7, account_number),  
        WHERE id = $8
        RETURNING id, full_name, email;
      `;

      const result = await query(
        updateUserQuery,
        [email, full_name,  phone_number, password, nin, bvn, account_number/* Add more values */, userId]
      );
  
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

// Delete a specific user by ID
export const deleteUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
  
    try {
      const result = await query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
  
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
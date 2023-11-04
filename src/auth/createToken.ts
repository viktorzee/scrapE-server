import jwt from 'jsonwebtoken';
import { User } from '../models/User';
require('dotenv').config()

// Secret key used to sign and verify the token
const secretKey = process.env.secret_key as any; // Replace with a strong, random string

export function createToken(user:User) {
  // Define the payload to include user information
  const payload = {
    userId: user.id,
    phone_number: user.phone_number,
    // Add any other user-related data you want to include in the token
  };

  // Sign the payload with the secret key to create the token
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}

module.exports = { createToken };

// src/db.ts

import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DB_URL

const pool = new Pool({
  connectionString,
});

export const query = async (text:string, params:any[] = []) => {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
};

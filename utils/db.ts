import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Use SSL in production
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

export default {
  query: (text, params) => pool.query(text, params),
};
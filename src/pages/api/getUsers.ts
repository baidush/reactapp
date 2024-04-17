// pages/api/getUsers.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/db'; // Ensure you have this db module to interact with your database

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const result = await db.query('SELECT * FROM users', []); // Adjust SQL as necessary
            res.status(200).json(result.rows);
        } catch (error: any) {
            res.status(500).json({ message: 'Server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end('Method Not Allowed');
    }
}

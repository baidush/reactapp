// pages/api/addUser.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/db';  // Ensure this is the correct path to your db module

type RequestBody = {
    first_name: string;
    last_name: string;
    email: string;
};

type ResponseData = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
} | { message: string };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        const { first_name, last_name, email }: RequestBody = req.body;
        try {
            const { rows } = await db.query(
                'INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *',
                [first_name, last_name, email]
            );
            res.status(200).json(rows[0]);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

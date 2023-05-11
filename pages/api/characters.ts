import { MapleUtilsParser } from '@/lib';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed, please use GET' });
    }

    const {
        name,
    } = req.query;
    const scopes = new Set<string>(
        typeof req.query.scopes === 'string'
            ? req.query.scopes.toLowerCase().split(',')
            : req.query.scopes?.flatMap(s => s.toLowerCase().split(',')) ?? []
    );

    if (name === undefined || typeof name !== 'string') {
        res.status(400).json({ error: 'Missing name query parameter' });
        return;
    }

    try {
        const char = await MapleUtilsParser.new().getCharacter({
            name,
            pet: scopes.has('pet'),
            equip: scopes.has('equip'),
            symbol: scopes.has('symbol'),
            cash: scopes.has('cash')
        });
        if (process.env.NODE_ENV ==='production') {
            res.setHeader('Cache-Control', 's-maxage=300');
        }
        res.status(200).json(char);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

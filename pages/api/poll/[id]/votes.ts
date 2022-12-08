import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        const pollId = String(req.query.id)
        const allVotes = await prisma.answer.findMany({
            where: { pollId },
            include: {
                _count: {
                  select: { votes: true },
                },
              },
        })

        return res.json(allVotes)
    }
}
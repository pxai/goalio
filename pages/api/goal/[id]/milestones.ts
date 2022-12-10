import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        const goalId = String(req.query.id)
        const allMilestones = await prisma.milestone.findMany({
            where: { goalId },
            include: {
                _count: {
                  select: { votes: true },
                },
              },
        })

        return res.json(allMilestones)
    }
}
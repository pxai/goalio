import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (req.method == "POST") {
        // creating a new todo.
        const answerId = String(req.body.answerId)
        const pollId = String(req.body.pollId)
        const existingVotes = await prisma.answer.findMany({ 
            where: { pollId: pollId },
            include: {
                votes: {
                    where: { voterId: session?.user?.id }
                },
            }
        })
        const hasVoted = existingVotes.flatMap(answer => answer.votes).length > 0;

        if (hasVoted)  {
            //res.status(400).send();
            return res.status(500).send({ statusText: 'User already voted' });
        } else {
            const result = await prisma.vote.create({
                data: {
                    answer: { connect: { id: String(answerId) } },
                    voter: { connect: { email: String(session?.user?.email) } },
                },
            })

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
}
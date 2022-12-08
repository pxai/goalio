import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (req.method === "PUT") {
        // update a todo.
        const id = String(req.query.id)
        const title = String(req.body.title);
        const content = String(req.body.content);
        const published = Boolean(req.body.published);
        const answers = req.body.answers;

        const poll = await prisma.poll.update({
            where: {
                id_and_authorId: {
                    id: String(id),
                    authorId: String(session?.user?.id),
                }
            },
            data: { 
                title, 
                content, 
                published,
            },
        })
        const upsertAnswers = answers.map(answer => {
            if (!answer.id)
                return prisma.answer.create({ data: {...answer}})

            return prisma.answer.update({
                where: { id: answer.id },
                data: {
                    ...answer
                }
            })
        })
        await prisma.$transaction(upsertAnswers)
        return res.json(poll);
    } else if (req.method === "DELETE") {
        // delete a todo.
        const { id } = req.query;
        const poll = await prisma.poll.delete({
            where: {
                id: String(id),
            },
        });
        return res.json(poll);
    }
}
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (req.method === "PUT") {
        const id = String(req.query.id)
        const title = String(req.body.title);
        const content = String(req.body.content);
        const published = Boolean(req.body.published);

        const goal = await prisma.goal.update({
            where: {
                id_and_ownerId: {
                    id: String(id),
                    ownerId: String(session?.user?.id),
                }
            },
            data: { 
                title, 
                content, 
                published,
            },
        })
        return res.json(goal);
    } else if (req.method === "DELETE") {
        // delete a todo.
        const { id } = req.query;
        const goal = await prisma.goal.delete({
            where: {
                id: String(id),
            },
        });
        return res.json(goal);
    }
}
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        // update a todo.
        const id = String(req.query.id)
        const title = String(req.query.title);

        const post = await prisma.answer.update({
            where: { id: String(id) },
            data: { title },
        })
        return res.json(post);
    } else if (req.method === "DELETE") {
        // delete a todo.
        const { id } = req.query;
        const post = await prisma.answer.delete({
            where: {
                id: String(id),
            },
        });
        return res.json(post);
    }
}
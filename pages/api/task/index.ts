import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (req.method == "POST") {
        // creating a new todo.
        const { title, content } = req.body
        const result = await prisma.task.create({
            data: {
                title,
                content,
                user: { connect: { email: String(session?.user?.email) } },
            },
        })
        return res.json(result)
    }
}
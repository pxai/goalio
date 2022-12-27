import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (req.method == "POST") {
        const { title, content, milestoneId } = req.body
        const task = await prisma.task.create({
            data: {
                title,
                content,
                milestone: { connect: { id: String(milestoneId) } },
                user: { connect: { email: String(session?.user?.email) } },
            },
        })
        console.log("Task created: ", task)
        return res.json(task)
    }
}
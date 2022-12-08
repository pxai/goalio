import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (req.method == "POST") {
        console.log("API> HERE we are: ", req.body)
        // creating a new todo.
        const title = String(req.body.title);
        const content = String(req.body.content);
        const published = Boolean(req.body.published);
        const answers = req.body.answers;

        const result = await prisma.poll.create({
            data: {
                title, content, published,
                author: { connect: { email: String(session?.user?.email) } },
                answers: { create: answers }
            },
        })
        return res.json(result)
    }
}
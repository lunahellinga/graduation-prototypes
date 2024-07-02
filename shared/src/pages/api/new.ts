import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

// POST /api/new
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { title, description, state } = req.body;

    if (state === undefined || title === undefined) {
      return res.status(400).json({ error: 'Title and state are required' });
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description: description || null,
        created: new Date(),
        state,
      },
    });

    res.status(201).json(todo);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
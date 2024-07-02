import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// GET /api/all
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }}

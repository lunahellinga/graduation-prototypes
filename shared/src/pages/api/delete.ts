import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// DELETE /api/delete?id=TODO_ID
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (id === undefined) {
      return res.status(400).json({ error: "ID is required" });
    }

    await prisma.todo.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Todo deleted" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

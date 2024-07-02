import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Todo } from "@/lib/model";

// PUT /api/update?id=TODO_ID
// PUT /api/update
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    if (req.query.hasOwnProperty("id")) {
      await updateSingle(req, res);
    } else {
      await updateMultiple(req, res);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

async function updateSingle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { title, description, state } = req.body;

  if (id === undefined || title === undefined || state === undefined) {
    return res.status(400).json({ error: "ID, title, and state are required" });
  }

  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: {
      title,
      description: description || null,
      state,
    },
  });

  res.status(200).json(todo);
}

async function updateMultiple(req: NextApiRequest, res: NextApiResponse) {
  const todos = req.body;

  const newTodos = await Promise.all(
    todos.map((todo: Todo) =>
      prisma.todo.upsert({
        where: { id: Number(todo.id) },
        update: {
          title: todo.title,
          description: todo.description || null,
          state: todo.state,
        },
        create: {
          title: todo.title,
          description: todo.description || null,
          state: todo.state,
          created: new Date(),
        },
      }),
    ),
  );

  res.status(200).json(newTodos);
}

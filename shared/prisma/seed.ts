import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const todoData: Prisma.TodoCreateInput[] = [
  {
    title: "My first todo",
    created: new Date(),
    state: 0,
  },
  {
    title: "Working on it",
    description: "This will take a while",
    created: new Date(),
    state: 1,
  },
  {
    title: "A Big Task",
    created: new Date(),
    state: 2,
  },
  {
    title: "Forget about it",
    description: "Not worth my time",
    created: new Date(),
    state: 3,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const t of todoData) {
    const todo = await prisma.todo.create({
      data: t,
    });
    console.log(`Created todo with id: ${todo.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

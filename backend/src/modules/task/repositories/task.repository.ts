import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TaskRepository {
  async create(
    userId: number,
    data: { description: string; priority: "ALTA" | "MEDIA" | "BAIXA" }
  ) {
    return prisma.task.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findPendingByUserId(userId: number) {
    return prisma.task.findMany({
      where: {
        userId,
        done: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async completeTask(userId: number, taskId: number) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task)
      throw new Error("Tarefa não encontrada ou não pertence ao usuário");

    return prisma.task.update({
      where: { id: taskId },
      data: { done: true },
    });
  }
}

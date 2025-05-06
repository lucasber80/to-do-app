import { createTaskSchema, CreateTaskDTO } from "../schemas/task.schema";
import { TaskRepository } from "../repositories/task.repository";

const taskRepo = new TaskRepository();

export async function createTaskService(userId: number, data: CreateTaskDTO) {
  const parsed = createTaskSchema.safeParse(data);
  if (!parsed.success) throw new Error("Dados inválidos");

  return await taskRepo.create(userId, parsed.data);
}

export async function listPendingTasksService(userId: number) {
  return await taskRepo.findPendingByUserId(userId);
}

export async function editTaskService(
  userId: number,
  taskId: number,
  data: CreateTaskDTO
) {
  return await taskRepo.edit(userId, taskId, data);
}

export async function completeTaskService(userId: number, taskId: number) {
  return await taskRepo.completeTask(userId, taskId);
}

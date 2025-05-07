import { createTaskSchema, CreateTaskDTO } from "../schemas/task.schema";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  async create(userId: number, data: CreateTaskDTO) {
    const parsed = createTaskSchema.safeParse(data);
    if (!parsed.success) throw new Error("Dados inválidos");

    return await this.taskRepo.create(userId, parsed.data);
  }

  async listPending(userId: number) {
    return await this.taskRepo.findPendingByUserId(userId);
  }

  async edit(userId: number, taskId: number, data: CreateTaskDTO) {
    return await this.taskRepo.edit(userId, taskId, data);
  }

  async complete(userId: number, taskId: number) {
    return await this.taskRepo.completeTask(userId, taskId);
  }
}

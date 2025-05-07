import { TaskRepository } from "../repositories/task.repository";
import { TaskService } from "../services/task.service";
const taskRepo = new TaskRepository();
const taskService = new TaskService(taskRepo);

export const createTaskController = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const task = await taskService.create(userId, req.body);
    return res.status(201).json(task);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const editTaskController = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const taskId = parseInt(req.params.id);
    const task = await taskService.edit(userId, taskId, req.body);
    return res.status(201).json(task);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const listPendingTasksController = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const tasks = await taskService.listPending(userId);
    return res.json(tasks);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const completeTaskController = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) return res.status(400).json({ error: "ID inválido" });

    const task = await taskService.complete(userId, taskId);
    return res.json(task);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

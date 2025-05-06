import {
    completeTaskService,
  createTaskService,
  listPendingTasksService,
} from "../services/task.service";

export const createTaskController = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const task = await createTaskService(userId, req.body);
    return res.status(201).json(task);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const listPendingTasksController = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const tasks = await listPendingTasksService(userId);
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

    const task = await completeTaskService(userId, taskId);
    return res.json(task);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

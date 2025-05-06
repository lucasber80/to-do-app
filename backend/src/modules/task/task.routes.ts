import { Router } from "express";
import { completeTaskController, createTaskController, listPendingTasksController } from "./controllers/task.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";

const router = Router();

router.get('/', authMiddleware, listPendingTasksController);
router.post("/", authMiddleware, createTaskController);
router.patch('/:id/complete', authMiddleware, completeTaskController);

export default router;

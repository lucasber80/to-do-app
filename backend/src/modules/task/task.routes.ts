import { Router } from "express";
import {
  completeTaskController,
  createTaskController,
  editTaskController,
  listPendingTasksController,
} from "./controllers/task.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";


const router = Router();

router.get('/', authMiddleware, listPendingTasksController);
router.post("/", authMiddleware, createTaskController);
router.patch('/:id/complete', authMiddleware, completeTaskController);
router.patch("/:id", authMiddleware, editTaskController);

export default router;

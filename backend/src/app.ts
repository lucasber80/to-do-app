import express from "express";
import cors from "cors";
import userRoutes from "./modules/user/user.routes";
import taskRoutes from "./modules/task/task.routes";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API To-Do rodando 🚀" });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

export default app;

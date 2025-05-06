import { Router } from "express";
import { createUserController } from "./controllers/user.controller";
import { loginController } from "./controllers/login.controller";

const router = Router();

router.post("/register", createUserController);

router.post("/login", loginController);

export default router;

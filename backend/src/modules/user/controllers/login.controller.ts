import { loginUserService } from "../services/login.service";
import { UserRepository } from "../repositories/user.repository";

const userRepo = new UserRepository();
export const loginController = async (req: any, res: any) => {
  try {
    const result = await loginUserService(req.body, userRepo);
    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

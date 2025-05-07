import { AuthService } from "../services/login.service";
import { UserRepository } from "../repositories/user.repository";

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
export const loginController = async (req: any, res: any) => {
  try {
    const result = await authService.login(req.body);
    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

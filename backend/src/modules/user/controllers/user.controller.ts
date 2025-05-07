import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
export const createUserController = async (req: any, res: any) => {
  try {
    const user = await userService.create(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

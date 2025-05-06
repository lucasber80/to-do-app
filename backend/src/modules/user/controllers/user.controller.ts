import { createUserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";

const userRepo = new UserRepository();
export const createUserController = async (req: any, res: any) => {
  try {
    const user = await createUserService(req.body, userRepo);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

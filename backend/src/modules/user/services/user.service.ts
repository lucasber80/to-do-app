import { UserRepository } from "../repositories/user.repository";
import { createUserSchema, CreateUserDTO } from "../schemas/user.schema";
import bcrypt from "bcryptjs";

export async function createUserService(
  data: CreateUserDTO,
  userRepo: UserRepository
) {
  const parsed = createUserSchema.safeParse(data);
  if (!parsed.success) throw new Error("Dados inválidos");

  const { name, email, password } = parsed.data;

  const existingUser = await userRepo.findByEmail(email);
  if (existingUser) throw new Error("E-mail já cadastrado");

  const hashedPassword = await bcrypt.hash(password, 10);

  return await userRepo.create({ name, email, password: hashedPassword });
}

import { UserRepository } from "../repositories/user.repository";
import { createUserSchema, CreateUserDTO } from "../schemas/user.schema";
import bcrypt from "bcryptjs";

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async create(data: CreateUserDTO) {
    const parsed = createUserSchema.safeParse(data);
    if (!parsed.success) throw new Error("Dados inválidos");

    const { name, email, password } = parsed.data;

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new Error("E-mail já cadastrado");

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepo.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}

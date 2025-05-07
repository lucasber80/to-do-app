import { loginSchema, LoginDTO } from "../schemas/login.schema";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}

  async login(data: LoginDTO) {
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) throw new Error("Dados inválidos");

    const { email, password } = parsed.data;

    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("E-mail ou senha incorretos");

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new Error("E-mail ou senha incorretos");

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "2h",
    });

    return {
      user,
      token,
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2h
    };
  }
}

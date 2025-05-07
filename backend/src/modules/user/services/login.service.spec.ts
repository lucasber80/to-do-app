// src/modules/user/services/login.service.spec.ts
import { AuthService } from "./login.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";

// 🧪 Mocks
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("loginUserService", () => {
  const mockFindByEmail = jest.fn();
  const mockUserRepo: jest.Mocked<UserRepository> = {
    findByEmail: mockFindByEmail,
    create: jest.fn(),
  };
  const authService = new AuthService(mockUserRepo);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar um token se o login for válido", async () => {
    mockFindByEmail.mockResolvedValue({
      id: 1,
      email: "joao@example.com",
      password: "senha-hash",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("token-mockado");

    const result = await authService.login({
      email: "joao@example.com",
      password: "123456",
    });

    expect(result).toHaveProperty("token", "token-mockado");
  });

  it("deve lançar erro se o e-mail não existir", async () => {
    mockFindByEmail.mockResolvedValue(null);

    await expect(() =>
      authService.login({ email: "naoexiste@example.com", password: "123456" })
    ).rejects.toThrow("E-mail ou senha incorretos");
  });

  it("deve lançar erro se a senha estiver incorreta", async () => {
    mockFindByEmail.mockResolvedValue({
      id: 1,
      email: "joao@example.com",
      password: "senha-hash",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(() =>
      authService.login({ email: "joao@example.com", password: "senhaErrada" })
    ).rejects.toThrow("E-mail ou senha incorretos");
  });
});

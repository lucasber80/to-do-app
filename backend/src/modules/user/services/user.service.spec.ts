import { createUserService } from "./user.service";
import bcrypt from "bcryptjs";

jest.mock("bcryptjs");

describe("createUserService", () => {
  const mockCreate = jest.fn();
  const mockFindByEmail = jest.fn();

  const mockUserRepo = {
    create: mockCreate,
    findByEmail: mockFindByEmail,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar um usuário com sucesso", async () => {
    mockFindByEmail.mockResolvedValue(null);
    mockCreate.mockResolvedValue({
      id: 1,
      name: "João",
      email: "joao@example.com",
      createdAt: new Date(),
    });
    (bcrypt.hash as jest.Mock).mockResolvedValue("senha-hash");

    const user = await createUserService(
      {
        name: "João",
        email: "joao@example.com",
        password: "123456",
      },
      mockUserRepo
    );

    expect(user).toHaveProperty("id");
    expect(mockCreate).toHaveBeenCalledWith({
      name: "João",
      email: "joao@example.com",
      password: "senha-hash",
    });
  });

  it("deve lançar erro se o e-mail já estiver cadastrado", async () => {
    mockFindByEmail.mockResolvedValue({
      id: 1,
      name: "João",
      email: "joao@example.com",
      password: "hash",
      createdAt: new Date(),
    });

    await expect(() =>
      createUserService(
        {
          name: "Outro Usuário",
          email: "joao@example.com",
          password: "abcdef",
        },
        mockUserRepo
      )
    ).rejects.toThrow("E-mail já cadastrado");
  });
});

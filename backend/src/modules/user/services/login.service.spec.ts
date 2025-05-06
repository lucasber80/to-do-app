// src/modules/user/services/login.service.spec.ts
import { loginUserService } from './login.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';

// 🧪 Mocks
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');


describe('loginUserService', () => {
  const mockFindByEmail = jest.fn();
  const mockUserRepo: jest.Mocked<UserRepository> = {
    findByEmail: mockFindByEmail,
    create: jest.fn(), // necessário mesmo que não usado aqui
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar um token se o login for válido', async () => {
    mockFindByEmail.mockResolvedValue({
      id: 1,
      email: 'joao@example.com',
      password: 'senha-hash',
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('token-mockado');

    const result = await loginUserService({
      email: 'joao@example.com',
      password: '123456',
    }, mockUserRepo);

    expect(result).toHaveProperty('token', 'token-mockado');
  });

  it('deve lançar erro se o e-mail não existir', async () => {
    mockFindByEmail.mockResolvedValue(null);

    await expect(() =>
      loginUserService({ email: 'naoexiste@example.com', password: '123456' }, mockUserRepo)
    ).rejects.toThrow('E-mail ou senha incorretos');
  });

  it('deve lançar erro se a senha estiver incorreta', async () => {
    mockFindByEmail.mockResolvedValue({
      id: 1,
      email: 'joao@example.com',
      password: 'senha-hash',
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(() =>
      loginUserService({ email: 'joao@example.com', password: 'senhaErrada' }, mockUserRepo)
    ).rejects.toThrow('E-mail ou senha incorretos');
  });
});

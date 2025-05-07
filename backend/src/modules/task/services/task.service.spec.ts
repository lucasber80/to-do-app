import { TaskService } from "./task.service";
import { TaskRepository } from "../repositories/task.repository";
import { CreateTaskDTO } from "../schemas/task.schema";
import { Priority } from "../enums/priotiry.enums";
describe("TaskService", () => {
  let service: TaskService;
  let mockRepo: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      findPendingByUserId: jest.fn(),
      edit: jest.fn(),
      completeTask: jest.fn(),
    } as unknown as jest.Mocked<TaskRepository>;

    service = new TaskService(mockRepo);
  });

  const userId = 1;
  const taskId = 123;
  const mockDTO: CreateTaskDTO = {
    description: "Nova tarefa",
    priority: Priority.MEDIA,
  };

  const mockTask = {
    id: taskId,
    description: mockDTO.description,
    priority: mockDTO.priority,
    done: false,
    createdAt: new Date(),
    userId,
  };

  it("deve criar uma tarefa com sucesso", async () => {
    mockRepo.create.mockResolvedValue(mockTask);

    const result = await service.create(userId, mockDTO);

    expect(result).toEqual(mockTask);
    expect(mockRepo.create).toHaveBeenCalledWith(userId, mockDTO);
  });

  it("deve lançar erro ao criar tarefa com dados inválidos", async () => {
    const invalidDTO = { description: "", priority: "INVALIDA" } as any;

    await expect(service.create(userId, invalidDTO)).rejects.toThrow(
      "Dados inválidos"
    );
  });

  it("deve retornar tarefas pendentes do usuário", async () => {
    mockRepo.findPendingByUserId.mockResolvedValue([mockTask]);

    const result = await service.listPending(userId);

    expect(result).toEqual([mockTask]);
    expect(mockRepo.findPendingByUserId).toHaveBeenCalledWith(userId);
  });

  it("deve editar uma tarefa", async () => {
    mockRepo.edit.mockResolvedValue({ ...mockTask, description: "Editado" });

    const result = await service.edit(userId, taskId, mockDTO);

    expect(result.description).toBe("Editado");
    expect(mockRepo.edit).toHaveBeenCalledWith(userId, taskId, mockDTO);
  });

  it("deve completar uma tarefa", async () => {
    const completedTask = { ...mockTask, done: true };
    mockRepo.completeTask.mockResolvedValue(completedTask);

    const result = await service.complete(userId, taskId);

    expect(result.done).toBe(true);
    expect(mockRepo.completeTask).toHaveBeenCalledWith(userId, taskId);
  });
});

import { z } from "zod";

export const createTaskSchema = z.object({
  description: z.string().min(3),
  priority: z.enum(["ALTA", "MEDIA", "BAIXA"]),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

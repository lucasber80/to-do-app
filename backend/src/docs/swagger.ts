import swaggerJSDoc from "swagger-jsdoc";
import loginPath from "./paths/users/login.path";
import registerPath from "./paths/users/register.path";
import userSchema from "./schemas/user.schema";
import taskSchema from "./schemas/task.schema";
import tasksPath from "./paths/tasks/tasks.path";

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0", // ✅ necessário para renderizar a documentação
    info: {
      title: "API de Tarefas com Autenticação",
      version: "1.0.0",
      description: "Documentação da API construída com Express + TypeScript",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ...userSchema,
        ...taskSchema,
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {
      ...loginPath,
      ...registerPath,
      ...tasksPath,
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default {
  "/users/register": {
    post: {
      summary: "Registra um novo usuário",
      tags: ["Usuários"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password"],
              properties: {
                name: {
                  type: "string",
                  example: "João da Silva",
                },
                email: {
                  type: "string",
                  example: "joao@example.com",
                },
                password: {
                  type: "string",
                  example: "123456",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Usuário criado com sucesso",
        },
        400: {
          description: "Erro de validação ou e-mail já cadastrado",
        },
      },
    },
  },
};

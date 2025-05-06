export default {
  "/users/login": {
    post: {
      summary: "Realiza o login do usuário",
      tags: ["Usuários"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login bem-sucedido",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginOutput",
              },
            },
          },
        },
        400: {
          description: "Credenciais inválidas",
        },
      },
    },
  },
};

export default {
  LoginInput: {
    type: "object",
    required: ["email", "password"],
    properties: {
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

  LoginOutput: {
    type: "object",
    properties: {
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
  },

  RegisterInput: {
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

  RegisterOutput: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      name: {
        type: "string",
        example: "João da Silva",
      },
      email: {
        type: "string",
        example: "joao@example.com",
      },
    },
  },
};

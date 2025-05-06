export default {
  TaskInput: {
    type: "object",
    required: ["description", "priority"],
    properties: {
      description: {
        type: "string",
        example: "Estudar Swagger",
      },
      priority: {
        type: "string",
        enum: ["ALTA", "MEDIA", "BAIXA"],
        example: "ALTA",
      },
    },
  },

  TaskOutput: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      description: {
        type: "string",
        example: "Estudar Swagger",
      },
      priority: {
        type: "string",
        enum: ["ALTA", "MEDIA", "BAIXA"],
        example: "ALTA",
      },
      done: {
        type: "boolean",
        example: false,
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2024-05-05T12:00:00Z",
      },
      userId: {
        type: "integer",
        example: 1,
      },
    },
  },
};

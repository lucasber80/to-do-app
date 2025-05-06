export default {
    '/tasks': {
      post: {
        summary: 'Cria uma nova tarefa',
        tags: ['Tarefas'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TaskInput',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Tarefa criada com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TaskOutput',
                },
              },
            },
          },
          400: {
            description: 'Erro ao criar tarefa',
          },
        },
      },
  
      get: {
        summary: 'Lista todas as tarefas pendentes do usuário',
        tags: ['Tarefas'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de tarefas pendentes',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/TaskOutput',
                  },
                },
              },
            },
          },
          401: {
            description: 'Não autorizado',
          },
        },
      },
    },
  
    '/tasks/{id}/complete': {
      patch: {
        summary: 'Marca uma tarefa como concluída',
        tags: ['Tarefas'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'ID da tarefa',
          },
        ],
        responses: {
          200: {
            description: 'Tarefa concluída com sucesso',
          },
          404: {
            description: 'Tarefa não encontrada',
          },
        },
      },
    },
  };
  
  
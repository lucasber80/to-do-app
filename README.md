# 📝 Sobre o Projeto

---

Este projeto é uma aplicação fullstack de gerenciamento de tarefas (To-Do List), onde os usuários podem criar, listar, editar, priorizar e concluir tarefas. Ele foi desenvolvido com foco em organização de código, boas práticas com Angular no frontend e Node.js com Prisma no backend.

## ⚙️ Instruções para inicializar os projetos

### Backend

1. Entre na pasta `backend`
2. Editar o arquivo `.env.example` para `.env`
3. Execute `npm i`
4. Rodar os seguintes comandos:
   - `npx prisma migrate dev --name init`
   - `npx prisma generate`
5. Executar `npm run dev`
6. A aplicação irá rodar em: http://localhost:3333
7. O swagger irá rodar em: http://localhost:3333/api-docs

### Frontend

1. Entre na pasta `frontend`
2. Se não possuir Angular, rodar: `npm install -g @angular/cli`
3. Rodar `npm i`
4. Rodar `ng serve --watch`
5. A aplicação irá rodar em: http://localhost:4200

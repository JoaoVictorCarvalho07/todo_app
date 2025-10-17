# 🧩 To-Do App — Full Stack

![React](https://img.shields.io/badge/Frontend-React-blue)

![Node](https://img.shields.io/badge/Backend-Node.js-green)

![SQLite](https://img.shields.io/badge/SQLite-07405E?logo=sqlite&logoColor=white&style=flat)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6)

![JWT](https://img.shields.io/badge/Auth-JWT-yellow)

![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC)

Um gerenciador de tarefas simples e elegante, desenvolvido com **React + TypeScript** no front-end e **Node.js + Express + TypeORM + MySQL** no back-end.  
Projeto criado como parte de um desafio técnico de desenvolvedor(a) júnior Full Stack.

---

## 🚀 Tecnologias Utilizadas

### 🔙 Backend

- **Node.js + Express**
- **TypeScript**
- **TypeORM**
- **SQLite** (banco temporário)
- **JWT (JSON Web Token)** para autenticação
- **Bcrypt** para hash de senhas
- **Dotenv** para variáveis de ambiente

### 💻 Frontend

- **React + TypeScript**
- **Vite**
- **Axios**
- **React Router DOM**
- **TailwindCSS** (interface clean e responsiva)
- **Lucide React / Phosphor Icons**

---

## ⚙️ Funcionalidades Principais

✅ Cadastro e login de usuários (com autenticação JWT)  
✅ CRUD de tarefas (criar, listar, editar e excluir)  
✅ Validação de campos e mensagens de erro visuais  
✅ Token armazenado no `localStorage`  
✅ Logout automático em caso de token expirado/inválido  
✅ Interface moderna, responsiva e intuitiva

---

## 📦 Estrutura de Pastas

```bash
todo_app/
│
├── backend/
│ ├── src/
│ │ ├── config/ # Conexão com banco de dados
│ │ ├── controllers/ # Lógica das rotas
│ │ ├── middleware/ # Autenticação e erros
│ │ ├── models/ # Entidades do TypeORM
│ │ ├── routes/ # Rotas Express
│ │ ├── services/ # Regras de negócio
│ │ └── utils/ # Classes de erro e helpers
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── api/ # Configuração do Axios
│ │ ├── pages/ # Páginas principais (Login, Signup, Tasks)
│ │ ├── components/ # Componentes reutilizáveis
│ │ └── App.tsx
│ └── package.json
│
└── package.json (raiz)

```

---
## 🧰 Instalação e Execução

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/JoaoVictorCarvalho07/todo_app.git
cd todo_app
```

### 2️⃣ instalar dependências tanto back quanto frontend

```bash
npm run setup
```

### 3️⃣ rodar ambos front e backend juntos

```bash
npm run dev
```

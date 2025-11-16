# Projeto Biblioteca Online

Projeto desenvolvido para a disciplina Programação Web Fullstack, com foco no desenvolvimento completo de uma aplicação web utilizando React.js (Frontend) e Express.js (Backend).

A aplicação segue o conceito de SPA - Single Page Application, utilizando React para manipulação da interface sem recarregar a página, e um Backend estruturado com rotas REST, validação, autenticação e segurança.

---

## Identificação
- **Aluno:** João Victor Vieira dos Anjos
- **ID Acadêmico:** 2311500  

---

## Tecnologias utilizadas

**Frontend**
React.js
Vite
Axios
Context API + Hooks
Proteção de rotas (ProtectedRoute)
Componente de autenticação com JWT

**Backend**
Node.js
Express.js
MongoDB + Mongoose
bcrypt
jsonwebtoken (JWT)
Winston Logger (logs de segurança)
compression (respostas gzipadas)
Cache interno (TTL)
Pool de conexões do Mongoose

**APIs externas**
Open Library API

## Estrutura do projeto

**Frontend**
src/
├── App.jsx
├── main.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── HomePage.jsx
│   ├── FavoritesPage.jsx
│   └── SearchBooks.jsx
├── components/
│   ├── Header.jsx
│   └── ProtectedRoute.jsx
└── context/
    └── AuthContext.jsx

**Backend**
backend/
├── server.js
├── config/
│   ├── db.js
│   └── logger.js
├── middleware/
│   ├── auth.js
│   └── cache.js
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Favorite.js
└── routes/
    ├── auth.js
    ├── books.js
    └── favorites.js

## Funcionalidades implementadas

**1. Login e Autenticação**
Cadastro e login de usuários
Senhas criptografadas com bcrypt
JWT com expiração
Rotas protegidas
Logs de acesso e falhas

**2. Busca de livros**
Busca pela Open Library API
Exibição de título, autor, ano e capa
Caso o livro não exista no banco, ele é criado automaticamente

**3. Favoritos**
Adicionar livros à lista de favoritos
Evita duplicados com índice único
Listagem de favoritos associada ao usuário autenticado

## Segurança
Criptografia de senhas
Sanitização de parâmetros
Proteção contra NoSQL Injection
Tokens JWT validados a cada requisição
Logout limpa o token
Logs de:
autenticação
buscas
falhas
inserções (POST)

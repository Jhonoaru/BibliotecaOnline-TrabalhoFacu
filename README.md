# Projeto Biblioteca Online

Projeto desenvolvido para a disciplina **Programação Web Fullstack**, com foco no desenvolvimento da camada **Frontend** de uma aplicação web utilizando **React.js** e **AJAX**.  

A aplicação segue o conceito de **SPA - Single Page Application**, em que todas as funcionalidades são implementadas em uma única página HTML, sem a necessidade de redirecionamento entre páginas para atualização da interface.

---

## Identificação
- **Aluno:** João Victor  
- **ID Acadêmico:** 2311500  

---

## Tecnologias utilizadas
- [React.js](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- **Hook utilizado:** `useReducer`

# Projeto Biblioteca Online

Projeto desenvolvido para a disciplina **Programação Web Fullstack**, com foco no desenvolvimento da camada **Frontend** de uma aplicação web utilizando **React.js** e **AJAX**.  

A aplicação segue o conceito de **SPA - Single Page Application**, em que todas as funcionalidades são implementadas em uma única página HTML, sem a necessidade de redirecionamento entre páginas para atualização da interface.

---

## Identificação
- **Aluno:** João Victor  
- **ID Acadêmico:** 2311500  

---

## Tecnologias utilizadas
- [React.js](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- **Hook utilizado:** `useReducer`

---

## Estrutura do projeto

src/
├── App.jsx
├── main.jsx
├── contexts/
│ └── BooksContext.jsx
└── components/
├── SearchBar.jsx
└── BookCard.jsx

- **`contexts/BooksContext.jsx`** → Context API + `useReducer` para gerenciar estado global dos livros.  
- **`components/SearchBar.jsx`** → Campo de busca para pesquisar livros.  
- **`components/BookCard.jsx`** → Card para exibir informações dos livros.  
- **`App.jsx`** → Estrutura principal da aplicação.

## API utilizada
- [Open Library API](https://openlibrary.org/developers/api)
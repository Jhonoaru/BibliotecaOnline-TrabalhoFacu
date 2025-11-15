import React, { useState, useEffect } from 'react';
import api from '../api';
import BookCard from '../components/BookCard.jsx';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', year: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', form);
      fetchBooks(); // Atualiza a lista de livros
      setForm({ title: '', author: '', year: '' });
    } catch (error) {
      console.error('Erro ao inserir livro:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Catálogo de Livros</h2>
      <ul className="book-list">
        {books.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </ul>

      <hr style={{ margin: '2rem 0' }} />

      <h3>Inserir Novo Livro</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Autor:</label>
          <input type="text" name="author" value={form.author} onChange={handleChange} required />
        </div>
        <div>
          <label>Ano:</label>
          <input type="number" name="year" value={form.year} onChange={handleChange} required />
        </div>
        <button type="submit">Adicionar Livro</button>
      </form>
    </div>
  );
}

export default HomePage;
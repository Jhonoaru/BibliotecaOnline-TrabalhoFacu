import React, { useState } from 'react';
import api from '../api';

function SearchBooks() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.get(`/search?title=${encodeURIComponent(query)}`);
      setResults(resp.data);
    } catch (err) {
      console.error('Erro ao buscar livros', err);
      alert('Erro ao buscar livros.');
    }
  };

  // envia title/author/coverImage para backend (rota aceita e cria Book)
  const addFavorite = async (book) => {
    try {
      const payload = {
        title: book.title,
        author: book.author,
        year: book.year || null,
        coverImage: book.coverUrl || (book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : null)
      };

      // garante que o token seja enviado; a instância `api` deve já ter Authorization header,
      // mas se não tiver, enviamos explicitamente:
      // const token = localStorage.getItem('token');
      // await api.post('/favorites', payload, { headers: { Authorization: `Bearer ${token}` } });

      await api.post('/favorites', payload);

      alert('Livro adicionado aos favoritos!');
    } catch (err) {
      console.error('Erro ao adicionar favorito', err.response?.data || err.message);
      // mostra mensagem mais informativa se backend retornar algo
      const msg = err.response?.data?.message || 'Erro ao adicionar favorito.';
      alert(msg);
    }
  };

  return (
    <div className="search-container">
      <h2>Pesquisar Livros (OpenLibrary)</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Digite o nome do livro..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <ul className="book-list">
        {results.map((b, i) => (
          <li key={i} className="book-card">

            <img
              src={b.coverUrl || (b.cover_id ? `https://covers.openlibrary.org/b/id/${b.cover_id}-M.jpg` : 'https://via.placeholder.com/120x170?text=Sem+Capa')}
              alt={b.title}
              style={{ width: 80, marginRight: 12 }}
            />

            <div style={{ flex: 1 }}>
              <h3>{b.title}</h3>
              <p>{b.author}</p>
              <p>{b.year || ''}</p>
            </div>

            <div>
              <button onClick={() => addFavorite(b)}>Favoritar ⭐</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBooks;

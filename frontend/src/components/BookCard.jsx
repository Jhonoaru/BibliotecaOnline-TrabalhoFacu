import React from 'react';
import api from '../api';

function BookCard({ book, onFavoriteSuccess }) {
  const handleAddToFavorites = async () => {
    try {
      await api.post('/favorites', { bookId: book._id });
      alert('Livro adicionado aos favoritos!');
      if(onFavoriteSuccess) onFavoriteSuccess();
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao adicionar aos favoritos.');
    }
  };

  return (
    <li className="book-card">
      <div>
        <h3>{book.title}</h3>
        <p>{book.author} ({book.year})</p>
      </div>
      <button className="favorite-btn" onClick={handleAddToFavorites}>
        Adicionar aos Favoritos
      </button>
    </li>
  );
}

export default BookCard;
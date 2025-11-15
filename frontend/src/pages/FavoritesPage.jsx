import React, { useState, useEffect } from 'react';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // A instância 'api' já tem o token no header
        const response = await fetch('http://localhost:5000/api/favorites', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Meus Livros Favoritos</h2>
      {favorites.length === 0 ? (
        <p>Você ainda não tem livros favoritos.</p>
      ) : (
        <ul className="favorite-list">
          {favorites.map(book => (
            <li key={book._id} className="favorite-card">
              <div>
                <h3>{book.title}</h3>
                <p>{book.author} ({book.year})</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
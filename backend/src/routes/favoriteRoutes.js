const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const logger = require('../config/logger');

// POST /api/favorites
// Aceita payload { bookId } OU { title, author, year, coverImage }
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId, title, author, year, coverImage } = req.body;

    let bookToUse = null;

    if (bookId) {
      bookToUse = await Book.findById(bookId);
      if (!bookToUse) return res.status(404).json({ message: 'Livro não encontrado.' });
    } else {
      // Criar novo livro no banco com os dados recebidos (se title presente)
      if (!title) return res.status(400).json({ message: 'bookId ou title é obrigatório.' });
      const newBook = new Book({
        title,
        author: author || 'Autor desconhecido',
        year: year || null,
        coverImage: coverImage || null
      });
      bookToUse = await newBook.save();
    }

    // Verifica duplicado
    const existing = await Favorite.findOne({ user: userId, book: bookToUse._id });
    if (existing) return res.status(409).json({ message: 'Este livro já está nos seus favoritos.' });

    const newFav = new Favorite({ user: userId, book: bookToUse._id });
    await newFav.save();

    logger.info(`Livro ${bookToUse._id} favoritado pelo usuário ${userId}`);
    return res.status(201).json({ message: 'Favorito adicionado', favorite: newFav });

  } catch (error) {
    logger.error(`Erro ao favoritar: ${error.message}`);
    return res.status(500).json({ message: 'Erro ao adicionar favorito.' });
  }
});

// GET /api/favorites  (mantive igual)
router.get('/', auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.userId }).populate('book');
    const books = favorites.map(fav => fav.book);
    res.json(books);
  } catch (error) {
    logger.error(`Erro ao buscar favoritos: ${error.message}`);
    res.status(500).send('Erro ao buscar favoritos');
  }
});

module.exports = router;

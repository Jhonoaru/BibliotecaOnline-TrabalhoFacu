const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const logger = require('../config/logger');

let cache = {};

router.get('/', auth, async (req, res) => {
  logger.info(`Busca de livros realizada pelo usuário ID: ${req.user.userId}`);
  
  if (cache.allBooks && Date.now() - cache.timestamp < 5 * 60 * 1000) {
    logger.info('Retornando livros do cache.');
    return res.json(cache.allBooks);
  }

  try {
    const books = await Book.find();
    cache.allBooks = books;
    cache.timestamp = Date.now();
    res.json(books);
  } catch (error) {
    logger.error(`Erro ao buscar livros: ${error.message}`);
    res.status(500).send('Erro ao buscar livros');
  }
});

router.post('/', auth, async (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    logger.warn(`Tentativa de inserção de livro falhou: campos em branco. Usuário ID: ${req.user.userId}`);
    return res.status(400).json({ message: 'Título, autor e ano são obrigatórios.' });
  }

  try {
    const newBook = new Book({ title, author, year });
    await newBook.save();
    
    cache = {};
    
    logger.info(`Livro inserido com sucesso: "${title}" pelo usuário ID: ${req.user.userId}`);
    res.status(201).json(newBook);
  } catch (error) {
    logger.error(`Erro ao inserir livro: ${error.message}`);
    res.status(500).send('Erro ao inserir livro');
  }
});

module.exports = router;
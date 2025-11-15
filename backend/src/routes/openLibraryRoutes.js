const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../middleware/auth');

// GET /api/search?title=...
router.get('/', auth, async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ message: "O parâmetro 'title' é obrigatório." });

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
    );

    const books = response.data.docs.slice(0, 20).map(doc => ({
      title: doc.title,
      author: doc.author_name ? doc.author_name[0] : 'Desconhecido',
      year: doc.first_publish_year || null,
      cover_id: doc.cover_i || null,
      coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
      // mantemos quaisquer campos extras se necessário
    }));

    return res.json(books);
  } catch (err) {
    console.error('Erro OpenLibrary:', err.message);
    return res.status(500).json({ message: 'Erro ao buscar livros.' });
  }
});

module.exports = router;

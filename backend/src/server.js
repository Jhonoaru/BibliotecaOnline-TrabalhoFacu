const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('./config/logger');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const openLibraryRoutes = require('./routes/openLibraryRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/search', openLibraryRoutes); // ⭐ NOVA ROTA AQUI

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info('MongoDB Conectado'))
  .catch(err => logger.error('Erro ao conectar ao MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

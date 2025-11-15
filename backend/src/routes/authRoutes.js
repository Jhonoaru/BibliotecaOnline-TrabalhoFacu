const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logger = require('../config/logger');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    logger.warn(`Tentativa de login falhou: campos em branco para o email ${email}`);
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Tentativa de login falhou: usuário não encontrado para o email ${email}`);
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Tentativa de login falhou: senha incorreta para o email ${email}`);
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    logger.info(`Usuário ${email} logado com sucesso.`);
    res.json({ token });

  } catch (error) {
    logger.error(`Erro no servidor ao fazer login: ${error.message}`);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const email = 'joao@email.com';
    const password = '12345';

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });

    await user.save();
    console.log('✅ Usuário criado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
    process.exit(1);
  }
};

createUser();
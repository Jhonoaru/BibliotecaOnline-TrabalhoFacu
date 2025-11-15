const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Erro de conexão com MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
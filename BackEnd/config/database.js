const mongoose = require('mongoose');
const config = require('./config');

const dbConnection = mongoose.connect(config.dbURL)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));
  module.exports = dbConnection;
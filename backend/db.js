const mongoose = require('mongoose');

async function connect(url) {
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = connect;
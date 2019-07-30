const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: String,
  owner: String
}, {
  versionKey: false
});

module.exports = mongoose.model('Todo', todoSchema);
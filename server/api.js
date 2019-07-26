const express = require('express');

const api = express.Router();

api.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  ///TODO
});

module.exports = api;
const mongoose = require('mongoose');
const config = require('./config');

const { host, port, db, user, pass } = config;
const uri = `mongodb://${user}:${pass}@${host}:${port}/${db}`;

module.exports = function() {
  return mongoose.connect(uri, { 
    useNewUrlParser: true,
    useFindAndModify: false 
  });
}

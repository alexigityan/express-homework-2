const mongoose = require('mongoose');
const config = require('./config');

class Database {
  constructor(config) {
    this._connect(config);
  }

  _connect(config) {

    const { host, port, db, user, pass } = config;
    const uri = `mongodb://${user}:${pass}@${host}:${port}/${db}`;

    mongoose.connect(uri, { useNewUrlParser: true })
      .then( () => console.log('connected to mongodb') )
      .catch( err => console.log(err) )

  }
}

module.exports = new Database(config);
 

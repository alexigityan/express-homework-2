const mongoose = require('mongoose');
const config = require('./config');

function connect() {

  const { host, port, db, user, pass } = config;
  const uri = `mongodb://${user}:${pass}@${host}:${port}/${db}`;

  mongoose.connect(uri, { 
    useNewUrlParser: true,
    useFindAndModify: false 
  })
    .then( () => console.log('connected to mongodb') )
    .catch( err => console.log(err) )

}

module.exports = connect;
 

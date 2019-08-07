const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: String,
  salt: String,
  hash: String
}, {
  versionKey: false
});

userSchema.statics.register = function (name, password) {
  return this.findOne({ name })
    .then( user => {
      if (user) {
        return { err: 'User already exists' };
      }

      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    
      return this.create({ name, salt, hash });
    })
}

userSchema.statics.login = function (name, password) {
  return this.findOne({ name })
    .then ( user => {
      if (!user) {
        return { err: 'User not found' };
      }

      const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');

      if ( hash !== user.hash ) {
        return { err: 'User not found' };
      }

      return user;
    })
}


module.exports = mongoose.model('User', userSchema);
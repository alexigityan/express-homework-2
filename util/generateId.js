const crypto = require('crypto');
const secret = process.env.SECRET || 'pineapple';

module.exports = function() {
  return crypto.createHash('sha256', secret)
               .update('' + Date.now() + Math.round(Math.random()*1000))
               .digest('hex');
}
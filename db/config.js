module.exports = {
  host: process.env.MNG_SERVER || 'localhost',
  port: process.env.MNG_PORT || 27017,
  db: process.env.MNG_DB || 'todo-app',
  user: process.env.MNG_USER || '',
  pass: process.env.MNG_PASS || ''
}
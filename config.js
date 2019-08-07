module.exports = {
  db: {
    host: process.env.MNG_HOST || 'localhost',
    port: process.env.MNG_PORT || 27017,
    db: process.env.MNG_DB || 'todo-app',
    user: process.env.MNG_USER || '',
    pass: process.env.MNG_PASS || ''
  },

  app: {
    port: process.env.PORT || 3000,
    secret: process.env.SECRET || 'pineapple'
  }
}
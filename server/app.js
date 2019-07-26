const express = require('express');
const cookieParser = require('cookie-parser');
const api = require('./api');

const app = express();

app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static());

app.use('/api', api);

app.get('/', (req, res)=>{
  res.render('index');
});

app.get('/edit', (req, res)=>{
  res.render('edit');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express listening on ${port}`);
});
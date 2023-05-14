const express = require('express');
const app = express();
const port = 4000;
// const path = require("path");

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});

const blog = {
  id: 1,
  title: 'Blog title',
  description: 'Blog description',
};

// ROUTES
app.get('/', (req, res) => {
  res.render("index")
});

app.get('/about', (req, res) => {
  res.render("about")
});

app.get('/post', (req, res) => {
  res.render("post")
});

app.get('/add_post', (req, res) => {
  res.render("add_post")
});

// MIDDLEWARES
app.use(express.static('public'));  // Statik dosyalarımızı public klasörümüz üzerinden çalıştırıyoruz.

// TEMPLATE ENGINE
app.set("view engine", "ejs");  // Uygulamamızda ejs modülünü kullanıyoruz.
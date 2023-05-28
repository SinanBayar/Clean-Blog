const express = require('express'); // express modülü kullanıyoruz.
const app = express();
const port = 4000;
// const path = require("path");  // core modül kullanmak istersek.
const mongoose = require('mongoose'); // MongoDB modülü kullanıyoruz.
const Post = require('./models/Post'); // Post modülü için erişim.

mongoose.connect('mongodb://localhost:27017/clean-blog-db'); // MongoDB database için erişim.

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});

const blog = {
  id: 1,
  title: 'Blog title',
  description: 'Blog description',
};

// MIDDLEWARES
app.use(express.static('public')); // Statik dosyalarımızı public klasörümüz üzerinden çalıştırıyoruz.
app.use(express.urlencoded({ extended: true })); // Body ile saklanan verinin url'sini çevirir.
app.use(express.json()); // Body ile saklanan veriyi json formatına çevirir.

// TEMPLATE ENGINE
app.set('view engine', 'ejs'); // Uygulamamızda ejs modülünü kullanıyoruz.

// ROUTES
app.get('/', async (req, res) => {
  const posts = await Post.find({}); // Databaseden Post modülüne göre verileri bulup anasayfada render ediyoruz.
  res.render('index', { posts });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/post', async (req, res) => {
  await Post.create(req.body); // Post modülünden faydalanılarak girilen data mongoDB veritabanına gönderildi.
  res.redirect('/'); // Sonrasında anasayfaya dönüldü.(render değil redirect!)
});

app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id); // Post modülündeki id bilgisinden faydalanılarak mongoDB veritabanından her bir post id'sine göre değişkene atanır.
  res.render('post', { post }); 
});

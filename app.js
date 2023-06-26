const express = require('express'); // express modülü kullanıyoruz.
const app = express(); // express'i app değişkeni ile kullanıyoruz.
const port = process.env.PORT || 4000; // Port değişkeni local için 4000, sunucuda PORT değişkenşne eşit.
const mongoose = require('mongoose'); // MongoDB modülü kullanıyoruz.
const methodOverride = require('method-override'); // Web'de put ve delete requestleri kullanabilmek için post requesti dönüştüren modül.
const pageControllers = require('./controllers/pageControllers.js');
const postControllers = require('./controllers/postControllers.js');

mongoose.connect('mongodb+srv://sinanbayar:rnApJdSSi1rHZgyi@cleanblog-cluster.vvjytlk.mongodb.net/?retryWrites=true&w=majority'); // MongoDB bulut database için erişim.

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});

// MIDDLEWARES
app.use(express.static('public')); // Statik dosyalarımızı public klasörümüz üzerinden çalıştırıyoruz.
app.use(express.urlencoded({ extended: true })); // Body ile saklanan verinin url'sini çevirir.
app.use(express.json()); // Body ile saklanan veriyi json formatına çevirir.
app.use(methodOverride('_method', { // Web'de put ve delete requestleri kullanabilmek için post requesti dönüştüren middleware fonksiyonu.
    methods: ['GET', 'POST'],
  })
);

// TEMPLATE ENGINE
app.set('view engine', 'ejs'); // Uygulamamızda ejs modülünü kullanıyoruz.

// ROUTES
app.get('/', postControllers.getAllPosts); // Anasayfa.
app.get('/post/:id', postControllers.getPost); // Seçilen id'li postun sayfası.
app.post('/post', postControllers.createPost); // Post oluşturma.
app.put('/post/:id', postControllers.updatePost); // Oluşturulmuş postu değiştirme.
app.delete('/post/:id', postControllers.deletePost); // Oluşturulmuş postu silme.

app.get('/about', pageControllers.getAboutPage); // About sayfası.
app.get('/add_post', pageControllers.getAdd_PostPage); // Post oluşturma sayfası.
app.get('/post/edit/:id', pageControllers.getEditPage); // Post değiştirme sayfası.
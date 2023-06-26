const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({}); // Databaseden Post modeline göre verileri bulup anasayfada render ediyoruz.
  res.render('index', { posts });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id); // Post modeline id bilgisinden faydalanılarak mongoDB veritabanından her bir post id'sine göre değişkene atanır.
  res.render('post', { post });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body); // Post modelinden faydalanılarak girilen data mongoDB veritabanına gönderildi.
  res.redirect('/'); // Sonrasında anasayfaya dönüldü.(render değil redirect!)
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }); // Post modeline göre MongoDB'den belirtilen id'li veri post değişkenine atanır.
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();  // Bu değişkenin title ve detail özellikleri request'tekideğerlerle güncellenir ve kaydedilir.
  res.redirect(`/post/${req.params.id}`); // Sonrasında değiştirilen verinin sayfasına gidilir.
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove({ _id: req.params.id }); // Post modeline göre MongoDB'den belirtilen id'li postlar bulunur ve silinir.
  res.redirect('/'); // Sonrasında anasayfaya dönüldü.(render değil redirect!)
};

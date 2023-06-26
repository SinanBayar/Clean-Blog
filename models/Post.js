const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Create Model
const Post = mongoose.model('Post', PostSchema); // MongoDB üzerinde "posts(Post)" isimli bir database'yi PostSchema'ya göre oluşturur.

// Export Module
module.exports = Post;
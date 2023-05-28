const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  title: String,
  detail: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Create Model
const Post = mongoose.model('Post', PostSchema);

// Export Module
module.exports = Post;
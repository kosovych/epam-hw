const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const atricle = new Schema(
    {
      id: {type: Number},
      title: {type: String},
      author: {type: String},
      img: {type: String},
      commentsCount: {type: Number, default: 0},
      text: {type: String},
      category: {type: String},
      src: {type: String},
      tags: {type: Array},
      categories: {type: Array},
      blockquote: {type: String},
      comments: {type: Array},
    }
);

module.exports = mongoose.model('Article', atricle);

let mongoose = require('mongoose');

// create a model class
let bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  author: String,
  genre: String
},
{
  collection: "books" // Replace with your actual collection name
});

module.exports = mongoose.model('Book', bookSchema);

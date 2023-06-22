// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    res.render('books/details', {
      title: 'Add a New Book',
      books: []
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  const title = req.body.title;
  const price = req.body.price;
  const author = req.body.author;
  const genre = req.body.genre;

  // Create a new book object
  const newBook = new book({
    Title: title,
    Price: price,
    Author: author,
    Genre: genre
  });

  // Save the new book to the database
  book.create(newBook, (err, book) => {
    if (err) {
      console.error(err);
    } else {
      console.log('New book has been added:', book);
      res.redirect('/books');
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  const id = req.params.id;

  // Find the book in the database by ID
  book.findById(id, (err, foundBook) => {
    if (err) {
      console.error(err);
    } else {
      res.render('books/details', {
        title: 'Book Details',
        books: foundBook
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  const id = req.params.id;

  // Extract the values from req.body
  const title = req.body.title;
  const price = req.body.price;
  const author = req.body.author;
  const genre = req.body.genre;

  // Create a new book object with the updated values
  const updatedBook = {
    _id: id,
    Title: title,
    Price: price,
    Author: author,
    Genre: genre
  };

  // Update the book in the database
  book.updateOne({ _id: id }, updatedBook, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Book has been updated:', updatedBook);
      res.redirect('/books');
      }
      });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

// Retrieve the book ID from the URL
const id = req.params.id;

// Remove the book from the database by ID
book.remove({ _id: id }, (err) => {
if (err) {
console.error(err);
} else {
console.log('Book has been deleted');
res.redirect('/books');
}
});
});


module.exports = router;

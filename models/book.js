const mongoose = require('mongoose');

const Author = require('./author');
const Publisher = require('./publisher');

const bookSchema = new mongoose.Schema({
    bookName: String,
    author: Author,
    publisher: Publisher,
    price: Number,
    imageURL: String,
    rating: Number,
});

module.exports = mongoose.model('book', bookSchema);
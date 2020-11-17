const express = require('express');
const router = express.Router();
const checkToken = require('../index');

const Book = require('../models/book');

router.post('/book', checkToken, async (req, res) => {
    try {
        if (req.userInfo.premission === 'admin') {
            const book = new Book({
                bookName: req.body.bookName,
                author: req.body.author,
                publisher: req.body.publisher,
                price: req.body.price,
                imageURL: req.body.imageURL,
                rating: req.body.rating
            });
            const addedBook = await book.save();
            return res.json(addedBook);
        } else return res.status(401).send("unauthorized");
    } catch (error) {
        return res.status(500).send(error);
    };
});

router.put('/book', checkToken, async (req, res) => {
    try {
        if (req.userInfo.premission === 'admin') {
            console.log(req.body.publisher)
            const book = await Book.findById(req.query.bookId);
            book.bookName = req.body.bookName;
            book.author = req.body.author;
            book.publisher = req.body.publisher;
            book.imageURL = req.body.imageURL;
            book.price = req.body.price;
            book.rating = req.body.rating;
            await book.save();
            const books = await Book.find();
            return res.json(books);
        } else return res.status(401).send("unauthorized");
    } catch (error) {
        return res.status(500).send(error);
    };
});

router.delete('/book', checkToken, async (req, res) => {
    try {
        await Book.findById(req.query.bookId).deleteOne();
        console.log(req.body.bookId)
        const books = await Book.find();
        return res.json(books);
    } catch (err) {
        return res.status(500).send(err);
    };
});




module.exports = router;

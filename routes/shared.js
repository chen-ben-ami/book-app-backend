const express = require('express');
const checkToken = require('../index');
const router = express.Router();

const Book = require('../models/book');

router.get("/test", checkToken, async (req, res) => {
    res.status(200).json(req.userInfo);
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        return res.status(500).send(error);
    }
});


router.get('/search-books', async (req, res) => {
    try {
        const books = await Book.find({ bookName: new RegExp(req.query.queryString, 'i') });
        return res.status(200).json(books)
    } catch (error) {
        return res.status(500).send(error);
    }
})

module.exports = router;
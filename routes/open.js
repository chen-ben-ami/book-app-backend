const express = require('express');
const checkToken = require('../index');
const router = express.Router();


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


router.get('/search', async (req, res) => {
    try {
        const books = await Book.find({ bookName: new RegExp(req.body.queryString, 'i') });
        return res.status(200).json(books)
    } catch (error) {
        return res.status(500).send(error);
    }
})

module.exports = router;
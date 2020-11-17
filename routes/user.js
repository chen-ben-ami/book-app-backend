const express = require('express');
const moment = require('moment');
const User = require('../models/user');
const Book = require('../models/book');
const router = express.Router();

router.put('/order-book', checkToken, async (req, res) => {
    try {
        const user = await User.findById(req.userInfo.userId);
        if (user) {
            const order = {
                orderDate: moment().format('MMMM Do YYYY, h:mm:ss'),
                bookId: req.query.bookId
            }
            user.lastOrder = order;
            await user.save();
            const book = await Book.findById(req.query.bookId);
            if (book) return res.status(200).json(book);
        } else return res.status(500).send("User not found");
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/get-order', checkToken, async (req, res) => {
    try {

        const user = await User.findById(req.userInfo.userId);
        if (user) {
            const bookId = user.lastOrder.bookId
            const book = await Book.findById(bookId);
            return res.status(200).json(book);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
const express = require('express');
const moment = require('moment');
const User = require('../models/user');
const Book = require('../models/book');
const router = express.Router();

router.put('/order-book', checkToken, async (req, res) => {
    try {
        const user = await User.findById(req.userInfo.username);
        if (user) {
            const order = {
                orderDate: moment().format('MMMM Do YYYY, h:mm:ss'),
                bookId: req.body.bookId
            }
            user.order = order;
            await User.update(user);
            return res.status(200).send("Order successfully placed!");
        } else return res.status(500).send("User not found");
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/get-book', checkToken, async (req, res) => {
    try {
        const book = await Book.findById(req.body.bookId);
        if (book) return res.status(200).json(book);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

//stuff
router.post('/login', async (req, res) => {
    const username = req.body.username;


});

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            permission: "user",
            lastOrder: null,
            token: null
        });
        const newUser = await user.save();
        res.status(200).json(user);

    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router;
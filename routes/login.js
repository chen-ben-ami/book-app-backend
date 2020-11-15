const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user === null) {
            return res.status(400).send('Cannot find user');
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const userInfo = { username: user.username, premission: user.permission };
            const acessToken = jwt.sign(userInfo, process.env.TOKEN_SECRET);

            return res.json(acessToken);
        } else {
            return res.status(401).send('Username or password are incorrect');
        };

    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            permission: "user",
            lastOrder: null
        });
        const savedUser = await user.save();
        return res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router;
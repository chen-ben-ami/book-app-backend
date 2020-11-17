const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user === null) {
            return res.status(401).send('Cannot find user');
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const userInfo = { userId: user._id, username: user.username, premission: user.permission };
            const acessToken = jwt.sign(userInfo, process.env.TOKEN_SECRET);

            return res.json({ acessToken: acessToken });
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
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            permission: "user",
            lastOrder: null
        });
        const savedUser = await user.save();
        const userInfo = { userId: savedUser._id, username: savedUser.username, premission: savedUser.permission };
        const acessToken = jwt.sign(userInfo, process.env.TOKEN_SECRET);
        return res.json({ acessToken: acessToken });
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router;
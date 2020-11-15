const mongoose = require('mongoose');

const Order = require('./order');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    permission: String,
    lastOrder: Order | null
});

module.exports = mongoose.model('user', userSchema);
const mongoose = require('mongoose');

const Order = require('./order');

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    permission: String,
    lastOrder: Order | null,
    token: String
});

module.exports = mongoose.model('user', userSchema);
const mongoose = require('mongoose');

const Purchase = require('./order');

const userSchema = new mongoose.Schema({
    id:String,
    fullName: String,
    token: String,
    imageURL: String,
    permission: String,
    lastPurchase: Purchase
});

module.exports = mongoose.model('user', userSchema);
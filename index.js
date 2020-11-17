const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const booksList = require('./Books');

module.exports = checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null || token === undefined) {
        return res.status(401).send('No token found');
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (error, userInfo) => {
        if (error) {
            return res.status(403).send('Invalid token');
        }
        req.userInfo = userInfo
        next();
    });
};


const admin = require('./routes/admin');
const user = require('./routes/user');
const login = require('./routes/login');
const shared = require('./routes/shared');

const app = express();
const port = process.env.PORT || "8080";

//MongoDB connection
mongoose.connect('mongodb://localhost/books-app', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
const Book = require('./models/book');
const User = require('./models/user');


//App setting
app.use(express.json());
app.use(cors());

connection.on('open', async () => {
    console.log('Connected to mongoDB');
    await User.deleteMany(() => { console.log('User collection has been deleted...') });
    await Book.deleteMany(() => { console.log('Book collection has been deleted...') });
    const hashedPassword = await bcrypt.hash("admin", 10)
    const admin = new User({
        username: "admin",
        password: hashedPassword,
        permission: "admin",
        lastOrder: null
    });
    const savedAdmin = await admin.save();
    for (let book of booksList) {
        const newBook = new Book({
            bookName: book.bookName,
            author: book.author,
            publisher: book.publisher,
            price: book.price,
            imageURL: book.imageURL,
            rating: book.rating
        });
        await newBook.save();
    };
});



//Routes
app.use(shared);
app.use(login);
app.use('/admin', admin);
app.use('/user', user);

app.use((req, res) => {
    res.status(404).send('<h1>Error: 404 Page not found...</h1>');
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});


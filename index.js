const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const mongoose=require('mongoose');
const admin = require('./routes/admin');
const user = require('./routes/user');
const login = require('./routes/login');
const open = require('./routes/open');

const app = express();
const port = process.env.PORT || "8080";

//MongoDB connection
mongoose.connect('mongodb://localhost/books-app', { useNewUrlParser: true, useUnifiedTopology: true });
const connection=mongoose.connection;
const Book = require('./models/book');
const User = require('./models/user');


//App setting
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

module.exports=checkToken=(req,res,next)=> {

}

app.get("/", (req, res) => {
    res.status(200).send("test");
});

connection.on('open', async () => {
    console.log('connected to mongoDB')
    await User.deleteMany(()=> {console.log('User collection has been deleted...')})
    await Book.deleteMany(()=> {console.log('Book collection has been deleted...')})

    
});


//Routes
app.use(open);
app.use(login);
app.use('/admin', admin);
app.use('/user', user);

app.use((req, res) => {
    res.status(404).send('<h1>Error: 404 Page not found...</h1>');
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});


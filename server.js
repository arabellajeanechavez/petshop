const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { name } = require('ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



mongoose.connect("mongodb://localhost:27017/Pet-shop", { useNewUrlParser: true }, { useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We're connected to the database!");
});


const userSchema = {
    name: String,
    email: String,
    password: String,
    confirmPassword: String
}

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String
});

const userMessage = new mongoose.Schema({
    name: String,
    email: String,
    phoneNum: String,
    userMessage: String
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Message = mongoose.model("User-Message", userMessage);

//routes
app.get("/", (req, res) => {
    res.set({
        "Allow-acces-Allow-Origin": '*'
    })
    return res.redirect('index.html')
})



app.post("/", function (req, res) {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });
    newUser.save()
        .then(() => {
            console.log('User has been Registered');
        })
        .catch(error => {
            console.error('Error registering User:', error);
            res.status(500).send('Internal Server Error');
        });
    res.redirect('index.html');
});

app.post("/add-product", function (req, res) {
    const newProduct = new Product({
        name: req.body.productName,
        description: req.body.productDescription,
        price: req.body.productPrice
    });
    newProduct.save()
        .then(() => {
            console.log('Product added successfully');
        })
        .catch(error => {
            console.error('Error adding product:', error);
            res.status(500).send('Internal Server Error');
        });
    res.redirect('index.html');
});

app.post("/add-message", function (req, res) {
    let newMessage = new Message({
        name: req.body.name,
        email: req.body.email,
        phoneNum: req.body.phoneNum,
        userMessage: req.body.userMessage
    });
    newMessage.save()
        .then(() => {
            console.log('Message added successfully');
        })
        .catch(error => {
            console.error('Error adding message:', error);
            res.status(500).send('Internal Server Error');
        });
    res.redirect('index.html');
});

const PORT = 3000;
app.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});
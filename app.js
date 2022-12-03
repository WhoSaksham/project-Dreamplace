// Setting up the dotenv
require('dotenv').config({ path: 'config.env' })

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const DB = process.env.DATABASE;
const port = process.env.PORT || 8000;
const hostname = '127.0.0.1';

// Serving static files
app.use(express.static('static'));

// Setting the template engine as pug
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));

// Connecting to MongoDB Atlas
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB)
        console.log('Connection Successful, we are connected!')
    } catch (error) {
        console.log('Failed to connect to Database...', error.message)
    }
}

// Defining a Schema for collections
var formSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    desc: String
});

var Contact = mongoose.model('Contact', formSchema);

// Endpoints
app.get('/', (req, res) => {
    res.status(200).render("index")
});

app.get('/launchpad', (req, res) => {
    res.status(200).render("launchpad")
});

app.get('/collections', (req, res) => {
    res.status(200).render("collections")
});

app.get('/dropcal', (req, res) => {
    res.status(200).render("dropcal")
});

app.get('/about', (req, res) => {
    res.status(200).render("about")
});

app.post('/about', (req, res) => {
    console.log(req.body);
    var myData = new Contact(req.body);
    myData.save().then(function () {
        res.status(200).send(`<h1>Your response has been stored in the Database Successfully!</h1><br><a href="/"><button>Home</button></a>`);
    }).catch(function () {
        res.status(400).send(`<h1>The response has not been stored to the Database due to an error, please try again!</h1><br><a href="/about"><button>Back</button></a>`)
    })
});

app.get('*', (req, res) => {
    res.status(404).render("404")
});

// Listening the server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server has successfully initiated on http://${hostname}:${port}`)
    })
})

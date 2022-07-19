const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
// const dotenv = require('dotenv');
const DB = 'mongodb+srv://saksham:saksham123@cluster0.4up7puc.mongodb.net/ContactForm?retryWrites=true&w=majority';
const port = process.env.PORT || 8000;
const hostname = '127.0.0.1';

// Setting up the dotenv
// dotenv.config({path: './config.env'});


// Serving static files
const staticPath = path.join(__dirname, "../static");
app.use(express.static(staticPath));


// Setting the template engine as pug
app.set('view engine', 'pug');


// Setting up the views directory
const viewsPath = path.join(__dirname, "../views");
app.set('views', viewsPath);


// Connecting to mongodb
// mongoose.connect('mongodb://localhost/ContactForm');


// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection-error'));
// db.once('open', function() {
//     console.log('We are connected Saksham!')
// });


// Connecting to MongoDB Atlas
mongoose.connect(DB).then( () => {
    console.log('Connection Successful, we are connected!')
}).catch( (err) => console.log('Failed to connect to Database'));


// Defining a Schema for collections
var formSchema = new mongoose.Schema({
    name : String,
    email : String,
    phone : Number,
    desc : String
});

var Contact = mongoose.model('Contact', formSchema);

app.use(express.urlencoded( {extended : true} ));


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

app.post('/about', (req, res) =>{
    console.log(req.body);
    var myData = new Contact(req.body);
    myData.save().then( function() {
        res.status(200).send(`<h1>Your data has been stored in the Database Successfully!</h1><br><a href="/"><button>Home</button></a>`);
    }).catch( function() {
        res.status(400).send(`<h1>The data has not been saved to the Database due to an error, please try again!</h1><br><a href="/about"><button>Back</button></a>`)
    })
});

app.get('*', (req, res) => {
    res.status(404).render("404")
});

// Listening the server
app.listen(port, () => {
    console.log(`Server has successfully initiated on http://${hostname}:${port}`)
})
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

// connect to MangoDB
const dbURI = 'mongodb+srv://user1:user@nodesmth.r4ibl.mongodb.net/node_db?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((_) => {
        console.log('connected to db');
        // listen for requests
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
// pass in an option -> how the logging data is being formatted { dev, tiny etc }
app.use(morgan('dev'));

// respond to requests
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'ABOUT' });
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {title: 'BLOGS', blogs: result});
        })
        .catch((e) => {
            console.log(e);
        });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'CREATE BLOG' });
});

app.use((req, res) => {
    res
        .status(404)
        .render('404', { title: '404' });
});
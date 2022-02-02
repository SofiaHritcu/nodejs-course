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

// mongoose and mongo tryings
app.get('/add-blog', (req, res) => {
    const blog = Blog({
        title: 'New Blog 2',
        snippet: 'about my new blog 2',
        body: 'more about my new blog 2',
    });
    blog.save()
        .then((result) => {
            // after the db saves the blog, it sends us the actual document inside the db collection
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((e) => {
            console.log(e);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('61fae7b53ae705ed92d65006')
        .then((result) => {
            res.send(result);
        })
        .catch((e) => {
            console.log(e);
        })
});

// respond to requests
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title: 'HOME', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'ABOUT' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'CREATE BLOG' });
});

app.use((req, res) => {
    res
        .status(404)
        .render('404', { title: '404' });
});
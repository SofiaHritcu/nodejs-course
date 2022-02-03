const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

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

// takes the url encoded data and it passes into an object in the request object
app.use(express.urlencoded({extended: true}));

// respond to requests
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'ABOUT' });
});

// blog routes
app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res
        .status(404)
        .render('404', { title: '404' });
});
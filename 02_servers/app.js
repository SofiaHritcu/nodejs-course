const express = require('express');
const morgan = require('morgan');

const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middleware and static files
app.use(express.static('public'));
// pass in an option -> how the logging data is being formatted { dev, tiny etc }
app.use(morgan('dev'));

// respond to requests
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title: 'HOME', blogs });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'CREATE BLOG' });
});

app.use((req, res) => {
    res
        .status(404)
        .render('404', { title: '404' });
});
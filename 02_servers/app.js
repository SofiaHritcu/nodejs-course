const express = require('express');

const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// create a logger middleware
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    // when express gets to this point, doesn t know where to go next
    // it is not aware of the next middleware
    // with the function next we are signaling htat we are not sending an answer in this middleware
    next();
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

app.use((req, res, next) => {
    console.log('in the next middlware');
    next();
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'CREATE BLOG' });
});

app.use((req, res) => {
    res
        .status(404)
        .render('404', { title: '404' });
});
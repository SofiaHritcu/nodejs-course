const express = require('express');

// set up an express up
// invoke the express to create an instance of the express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
// for setting ejs and express to look into another folder than the default /views
// app.set('views', 'my-views')

// listen for requests
// it infers that we are using localhosts
app.listen(3000);

// respond to requests
app.get('/', (req, res) => {
    // render the file with ejs view engine and send it back to the browser
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

// 404 page
// use -> method to fire middleware and use middleware in express
// use function is fired each time a request is sent
// but only if it gets to this point
// the express behavior is that express is running the app.js code top to bottom
// and it s looking for matches through out the gets 
// trying to find the url
// if by this point, no match was found, it will use this 
// THE POSITION OF THIS CODE IS ESSENTIAL
// if a response is sent to the browser, the code won t be carried on with
app.use((req, res) => {
    res
        // manually set the status code
        .status(404)
        .render('404', { title: '404' });
});
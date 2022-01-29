const express = require('express');

// set up an express up
// invoke the express to create an instance of the express app
const app = express();

// listen for requests
// it infers that we are using localhosts
app.listen(3000);

// respond to requests
app.get('/', (req, res) => {
    // the method infers the type of content that is being sent
    // also it infers the status code
    // res.send('<p>home page</p>');

    // looks for an absolute path
    res.sendFile('./views/index.html', { root: __dirname});
});

app.get('/about', (req, res) => {
    // the method infers the type of content that is being sent
    // also it infers the status code
    // res.send('<p>about page</p>');

    // looks for an absolute path
    res.sendFile('./views/about.html', { root: __dirname});
});

// redirects
app.get('/about-me', (req, res) => {
    // forces a new request towards the new page
    res.redirect('/about');
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
        .sendFile('./views/404.html', { root: __dirname});
});
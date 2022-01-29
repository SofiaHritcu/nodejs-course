const http = require('http');
const fs = require('fs');
// require the lodash module
const _ = require('lodash');

// save the instance of the server
// the callback function is called each time a request is made
// the callback has 2 params : the request and the response
const server = http.createServer((request, response) => {
    // console.log(request.url, request.method);

    // lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });
    
    greet();
    greet();
    
    // 1. set header content type
    // 2. write response
    // 3. end response
    
    // plain text
    // response.setHeader('Content-Type', 'text/plain');
    // response.write('hello there');
    // response.end();

    // html
    // response.setHeader('Content-Type', 'text/html');
    // response.write('<head><link rel="stylesheet" href="#"></head>')
    // response.write('<p>Hello!</p>');
    // response.write('<p>Hello, again!</p>');
    // response.end();

    // returning html pages
    // response.setHeader('Content-Type', 'text/html');
    // fs.readFile('./views/index.html', (err, data) => {
    //     if ( err ) {
    //         console.log(err);
    //         response.end();
    //     } else {
    //         // response.write(data);
    //         response.end(data);
    //     } 
    // });

    // basic routing
    response.setHeader('Content-Type', 'text/html');

    let path = `./views/`;
    switch(request.url) {
        case '/':
            path += 'index.html';
            response.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            response.statusCode = 200;
            break;
        case '/about-bla':
            // the resource has been permanently moved
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
            break;
        default:
            path += '404.html';
            response.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if ( err ) {
            console.log(err);
            response.end();
        } else {
            response.end(data);
        } 
    });

});

// make the server active
// the callback is fired one the server starts listening for requests
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});
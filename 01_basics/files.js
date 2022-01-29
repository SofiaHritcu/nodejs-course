const fs = require('fs');

// reading files
// the callback is executed after the file is read
// the call is async

// fs.readFile('./docs/blog1.txt', (err, data) => {
//     if( err ){
//         console.log(err);
//     }
//     console.log(data.toString());
// });

// writing files
// async callback
// if the file doesn t exist, created one
// console.log('last line');
// fs.writeFile('./docs/blog2.txt', 'hello, again!', () =>{
//    console.log('file was written') ;
// });

// directories
// if the folder exists, error is throwed
// if( !fs.existsSync('./assets')) {
//     fs.mkdir('./assets', (err) => {
//         if ( err ) {
//             console.log(err);
//         }
//         console.log('folder created');
//     });
// } else {
//     fs.rmdir('./assets', (err) => {
//         if ( err ) {
//             console.log(err);
//         }
//         console.log('folder deleted');
//     });
// }


// deleting files
// if( fs.existsSync('./docs/deleteme.txt')) {
//     fs.unlink('./docs/deleteme.txt', (err) => {
//         if ( err ) {
//             console.log(err);
//         }
//         console.log('file deleted');
//     });
// }

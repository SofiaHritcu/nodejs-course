const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// on = event listener -> everytime we get a buffer of data from the stream
// readStream.on('data', (chunck) => {
//     console.log('new chunck');
//     console.log(chunck);
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunck);
// });

// PIPE - from a readable stream to a writeable
readStream.pipe(writeStream);

// dublex stream -> read and write from/to
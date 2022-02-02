const mongoose = require('mongoose');
// the schema defines the structure of the documents
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
}, {timestamps: true});

// the model is based on the schema and provides us a interface to interract with the db collection
const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;
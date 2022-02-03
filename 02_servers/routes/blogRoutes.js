const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

// blog routes
router.get('/create', (req, res) => {
    res.render('create', { title: 'CREATE BLOG' });
});

router.get('', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {title: 'BLOGS', blogs: result});
        })
        .catch((e) => {
            console.log(e);
        });
});

router.post('/', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(() => {
            res.redirect('/blogs');
        })
        .catch((e) => {
            console.log(e);
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', {blog: result, title: 'BLOG DETAILS'});
        })
        .catch((e) => {
            console.log(e);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            // when coming from an AJAX request
            // in node we cannot just redirect
            // we have to send back an answer -> JSON object
            // the JSON object will have a redirect property
            res.json({ redirect: '/blogs' });
        })
        .catch((e) => {
            console.log(e);
        });
});

module.exports = router;
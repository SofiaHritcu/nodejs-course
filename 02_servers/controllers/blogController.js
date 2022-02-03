const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', {title: 'BLOGS', blogs: result});
        })
        .catch((e) => {
            console.log(e);
        });
};

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', {blog: result, title: 'BLOG DETAILS'});
        })
        .catch((_) => {
            res.status(404).render('404', { title: 'BLOG NOT FOUND'});
        });
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'CREATE BLOG' });
};

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(() => {
            res.redirect('/blogs');
        })
        .catch((e) => {
            console.log(e);
        });
};

const blog_delete = (req, res) => {
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
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
}
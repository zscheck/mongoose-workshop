const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// GET	/api/blogs/	Get all Blogs
router.get('/', (req, res) => {
    Blog.find()
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(console.error);
});

// GET	/api/blogs/featured	Get all featured Blogs	.where()
router.get('/featured', (req, res) => {
    Blog.where('featured', 'true')
        .then(blog => {
            res.status(200).json(blog);
        })
        .catch(console.error);
});
// GET	/api/blogs/:id	Get single Blog	.findById()
router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (!blog) res.status(404).send(null);
            res.status(200).json(blog);
        })
        .catch(console.error);
})

// POST	/api/blogs?userId	Create a Blog + associate to userId	.save() (read Constructing Documents)
router.post('/', (req, res) => {
    //New higher scope variable
    let dbUser = null;

    // Fetch the user from the database
    User.findById(req.query.userId)
        .then(user => {
            // if (!user) res.status(404).send(null);
            // Store the fetched user in higher scope variable
            dbUser = user;

            // Create a blog
            const newBlog = new Blog(req.body);

            // Bind the user to it
            newBlog.author = user._id;

            // Save it to the database
            return newBlog.save();
        })
        .then(blog => {
            // Push the saved blog to the array of blogs associated with the User
            dbUser.blogs.push(blog);
            
            // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
            dbUser.save().then(() => res.status(201).json(blog));
        })
        .catch(console.error);
});

// PUT	/api/blogs/:id	Update a Blog	.findByIdAndUpdate()
router.put('/:id', (req, res) => {
    Blog.findByIdAndUpdate(
        req.params.id,
        { $set: req.body })
        .then(blog => {
            res.status(204).send(req.body);
        })
        .catch(console.error);
});

// DELETE	/api/blogs/:id	Delete a Blog	.findByIdAndRemove()
router.delete('/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(blog => {
            res.send(req.params.id);
        })
        .catch(console.error);
});

module.exports = router;